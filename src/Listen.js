import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import "./Listen.css";
import DevPublisher from "./DevPublisher.js";
import { AuthContext, getAuthorizeURI } from "./Auth.js";
import SongPlayerWithControls from "./SongPlayerWithControls.js";
import TrackList from "./TrackList.js";
import Track from "./Track.js";
import EQBars from "./EQBars.js";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@rehooks/local-storage";
import Listeners from "./Listeners";
import { isOnline } from "./Utils";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import * as mutations from "./graphql/mutations";

function StartListening({ children, isListening, onClick }) {
  const location = useLocation();
  const authInfo = React.useContext(AuthContext);

  if (isListening) {
    return children;
  }

  return (
    <div className="Listen-startListening">
      <div className="Listen-startListeningMask">{children}</div>
      <div className="Listen-startListeningContent">
        <EQBars className="Listen-EQ" />
      </div>
      <div className="Listen-startListeningContent">
        <a className="Listen-play" href={location.pathname} onClick={onClick}>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          👂
          <span className="Listen-playLink">
            {authInfo == null ? "Login to join ▶" : "Join ▶"}
          </span>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          😈
        </a>
      </div>
    </div>
  );
}

function publishListenPing(userID, hostUsername) {
  return API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        userID,
        latestListenPing: Math.floor(Date.now() / 1000),
        listeningTo: hostUsername,
      },
    })
  );
}

function ListenPlayer({ isCurrentlyLive, songs, hostUsername }) {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const [isListeningUsername, setIsListeningUsername] = useLocalStorage(
    "EMisListeningUsername"
  );
  const isListening = authInfo && hostUsername === isListeningUsername;
  const NoSleep = window.NoSleep;

  React.useEffect(() => {
    if (isListening && NoSleep != null) {
      const noSleep = new NoSleep();
      noSleep.enable();
      return () => noSleep.disable();
    }
  }, [isListening, NoSleep]);

  React.useEffect(() => {
    if (isListening && authInfo) {
      publishListenPing(authInfo.username, hostUsername);
      const intervalID = setInterval(() => {
        publishListenPing(authInfo.username, hostUsername);
      }, 10000);
      return () => clearInterval(intervalID);
    }
  }, [isListening, authInfo, hostUsername]);

  const handleJoin = React.useCallback(
    (e) => {
      e.preventDefault();
      setIsListeningUsername(hostUsername);
      if (authInfo == null) {
        window.location.href = getAuthorizeURI(location.pathname);
      }
    },
    [setIsListeningUsername, authInfo, location, hostUsername]
  );

  if (!isCurrentlyLive) {
    return <h1>offline</h1>;
  }

  return (
    <StartListening isListening={isListening} onClick={handleJoin}>
      {isListening && <p>Listening to {hostUsername}'s channel!</p>}
      {isListening && <SongPlayerWithControls song={songs[0]} />}
      <div>Now Playing:</div>
      <Track track={songs[0].track} />
    </StartListening>
  );
}

function Listen({ hostUsername }) {
  const location = useLocation();
  const devPublisherEnabled = location.search.includes("DEV=1");

  return (
    <div className="Listen">
      <Connect
        query={graphqlOperation(queries.songEventsByUserId, {
          userID: hostUsername,
          sortDirection: "DESC",
          limit: 50,
        })}
        subscription={graphqlOperation(subscriptions.onCreateSongEvent, {
          userID: hostUsername,
        })}
        onSubscriptionMsg={(prev, { onCreateSongEvent }) => {
          if (prev?.songEventsByUserID?.items == null) {
            console.error("bad state in listen", prev);
            return prev;
          }
          prev.songEventsByUserID.items.unshift(onCreateSongEvent);
          if (prev.songEventsByUserID.items.length > 50) {
            prev.songEventsByUserID.items.pop();
          }
          return prev;
        }}
      >
        {({ data, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !data) return <h3>Loading...</h3>;
          const songs =
            (data.songEventsByUserID && data.songEventsByUserID.items) ?? [];
          if (songs.length === 0) {
            return <div>No track history for {hostUsername}</div>;
          }
          const online = isOnline(songs);

          return (
            <>
              {online && (
                <div className="Listen-listeners">
                  <Listeners hostID={hostUsername} />
                </div>
              )}
              <div className="Listen-trackList">
                <div className="Listen-header">
                  {hostUsername}'s Channel
                  {devPublisherEnabled && (
                    <DevPublisher hostUsername={hostUsername} />
                  )}
                </div>
                <>
                  <ListenPlayer
                    isCurrentlyLive={online}
                    songs={songs}
                    hostUsername={hostUsername}
                  />
                  <TrackList songs={online ? songs.slice(1) : songs} />
                </>
              </div>
            </>
          );
        }}
      </Connect>
    </div>
  );
}

export default Listen;
