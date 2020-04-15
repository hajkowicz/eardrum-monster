import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import "./Listen.css";
import DevPublisher from "./DevPublisher.js";
import { AuthContext, getAuthorizeURI } from "./Auth.js";
import SongPlayerWithControls from "./SongPlayerWithControls.js";
import TrackList from "./TrackList.js";
import Track from "./Track.js";
import EQBars from "./EQBars.js";
import { useHistory, useLocation } from "react-router-dom";
import NoSleep from "nosleep.js";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

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
        <a
          className="Listen-play"
          href={
            authInfo == null
              ? getAuthorizeURI(location.pathname + "?join=true")
              : location.pathname
          }
          onClick={authInfo ? onClick : null}
        >
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

function ListenPlayer({ isCurrentlyLive, songs, hostUsername }) {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [isListening, setIsListening] = React.useState(false);

  React.useEffect(() => {
    if (isListening) {
      const noSleep = new NoSleep();
      noSleep.enable();
      console.log("enabling");
      return () => noSleep.disable();
    }
  }, [isListening]);

  React.useEffect(() => {
    if (authInfo && location.search.includes("join=true")) {
      setIsListening(true);
      history.replace(location.pathname);
    }
  }, [authInfo, history, location]);

  const handleJoin = React.useCallback(
    (e) => {
      e.preventDefault();
      setIsListening(true);
    },
    [setIsListening]
  );

  if (!isCurrentlyLive) {
    return <div>User is offline</div>;
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
      <div className="Listen-header">
        {devPublisherEnabled && <DevPublisher hostUsername={hostUsername} />}
      </div>

      <div className="Listen-trackList">
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
              return <div>No track history available</div>;
            }
            const isRecent =
              Math.floor(Date.now() / 1000) - songs[0].timestamp < 600; // 10 minutes in seconds
            return (
              <>
                <ListenPlayer
                  isCurrentlyLive={isRecent}
                  songs={songs}
                  hostUsername={hostUsername}
                />
                <TrackList songs={isRecent ? songs.slice(1) : songs} />
              </>
            );
          }}
        </Connect>
      </div>
    </div>
  );
}

export default Listen;
