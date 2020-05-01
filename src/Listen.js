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
import { useLocation, useHistory } from "react-router-dom";
import { useLocalStorage } from "@rehooks/local-storage";
import Listeners from "./Listeners";
import { isUserOnline } from "./Utils";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import * as mutations from "./graphql/mutations";

function createUserObservable(hostUserID) {
  return API.graphql(
    graphqlOperation(subscriptions.onUpdateUserByUserId, {
      userID: hostUserID,
    })
  );
}

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

function publishListenPing(userID, hostUserID) {
  return API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        userID,
        latestListenPing: Math.floor(Date.now() / 1000),
        listeningTo: hostUserID,
      },
    })
  );
}

function ListenPlayer({ isCurrentlyLive, songs, hostUserID, hostDisplayName }) {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const [isListeningUsername, setIsListeningUsername] = useLocalStorage(
    "EMisListeningUsername"
  );
  const isListening = authInfo && hostUserID === isListeningUsername;
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
      publishListenPing(authInfo.username, hostUserID);
      const intervalID = setInterval(() => {
        publishListenPing(authInfo.username, hostUserID);
      }, 10000);
      return () => clearInterval(intervalID);
    }
  }, [isListening, authInfo, hostUserID]);

  const handleJoin = React.useCallback(
    (e) => {
      e.preventDefault();
      setIsListeningUsername(hostUserID);
      if (authInfo == null) {
        window.location.href = getAuthorizeURI(location.pathname);
      }
    },
    [setIsListeningUsername, authInfo, location, hostUserID]
  );

  if (!isCurrentlyLive) {
    return <h1>offline</h1>;
  }

  return (
    <StartListening isListening={isListening} onClick={handleJoin}>
      {isListening && <p>Listening to {hostDisplayName}'s channel!</p>}
      {isListening && <SongPlayerWithControls song={songs[0]} />}
      <div>Now Playing:</div>
      <Track track={songs[0].track} />
    </StartListening>
  );
}

function Listen({ hostDisplayName, hostUserID, hostUserImg }) {
  const location = useLocation();
  const history = useHistory();
  const devPublisherEnabled = location.search.includes("DEV=1");

  // Setup host subscription
  React.useEffect(() => {
    const obs = createUserObservable(hostUserID);
    const sub = obs.subscribe({
      next: (event) => {
        if (event) {
          const newHostDisplayName =
            event.value.data.onUpdateUserByUserID?.displayName;
          if (
            newHostDisplayName != null &&
            newHostDisplayName !== hostDisplayName
          ) {
            history.replace(`/u/${newHostDisplayName}`);
          }
        }
      },
    });
    return () => {
      sub.unsubscribe();
    };
  }, [hostUserID, hostDisplayName, history]);

  return (
    <div className="Listen">
      <Connect
        query={graphqlOperation(queries.songEventsByUserId, {
          userID: hostUserID,
          sortDirection: "DESC",
          limit: 50,
        })}
        subscription={graphqlOperation(subscriptions.onCreateSongEvent, {
          userID: hostUserID,
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
          const online = songs.length > 0 && isUserOnline(songs[0].user);

          return (
            <>
              {online && (
                <div className="Listen-listeners">
                  <Listeners
                    hostUserID={hostUserID}
                    hostDisplayName={hostDisplayName}
                    hostUserImg={hostUserImg}
                  />
                </div>
              )}
              <div className="Listen-trackList">
                <div className="Listen-header">
                  {hostDisplayName}'s Channel
                  {devPublisherEnabled && (
                    <DevPublisher hostUserID={hostUserID} />
                  )}
                </div>
                <>
                  <ListenPlayer
                    isCurrentlyLive={online}
                    songs={songs}
                    hostDisplayName={hostDisplayName}
                    hostUserID={hostUserID}
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
