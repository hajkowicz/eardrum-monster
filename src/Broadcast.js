import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer.js";
import Track from "./Track.js";
import TrackList from "./TrackList.js";
import "./Broadcast.css";
import { AuthContext } from "./Auth.js";
import BroadcastPublisher from "./BroadcastPublisher";
import PowerHourControl from "./PowerHourControl.js";
import EQBars from "./EQBars.js";
import Listeners from "./Listeners";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BroadcastHeading from "./BroadcastHeading";

function Broadcast() {
  const authInfo = React.useContext(AuthContext);
  const [songHistory, setSongHistory] = React.useState(null);
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const [copied, setCopied] = React.useState(false);

  const handleSongEvent = React.useCallback(
    (songEvent) => {
      setSongHistory((h) => [songEvent].concat(h));
    },
    [setSongHistory]
  );

  React.useEffect(() => {
    if (authInfo) {
      API.graphql(
        graphqlOperation(queries.songEventsByUserId, {
          userID: authInfo.username,
          sortDirection: "DESC",
          limit: 10,
        })
      ).then((response) => {
        setSongHistory(response.data?.songEventsByUserID?.items ?? []);
      });
    }
  }, [authInfo]);

  React.useEffect(() => {
    if (copied) {
      const timeoutID = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeoutID);
    }
  }, [copied]);

  if (authInfo == null) {
    return <div>Login to spotify to set the eardrum monster free</div>;
  }

  const trackList =
    songHistory == null ? null : (
      <div className="Broadcast-history">
        <TrackList songs={songHistory.slice(1)} />
      </div>
    );

  const shareURI = `https://eardrum.monster/u/${authInfo.displayName}`;

  const player =
    spotifyWebPlayer == null || songHistory == null ? (
      <div>Initializing Spotify web player...</div>
    ) : (
      <>
        <div className="Broadcast-title">
          <BroadcastHeading hostDisplayName={authInfo.displayName} />
        </div>
        <div className="Broadcast-text">You are the DJ.</div>
        <div className="Broadcast-text">
          <div>1. Control your spotify like normal to change the music</div>
          <div>2. keep this page open to continue streaming</div>
        </div>
        <div className="Broadcast-text">
          Share this URL to add listeners:
          <input value={shareURI} disabled size={shareURI.length} />
          <button>
            <CopyToClipboard
              text={`https://eardrum.monster/u/${authInfo.displayName}`}
              onCopy={() => {
                setCopied(true);
              }}
            >
              <span>{copied ? "Copied!" : "Copy"}</span>
            </CopyToClipboard>
          </button>
        </div>
        <PowerHourControl />
        <EQBars className="Broadcast-streaming" />
        <p>Now playing:</p>
        <div className="Broadcast-currentTrack">
          <BroadcastPublisher
            currentSongEvent={songHistory[0]}
            onSongEvent={handleSongEvent}
          />
          <Track track={songHistory[0]?.track} />
        </div>
      </>
    );

  return (
    <div className="Broadcast">
      <div className="Broadcast-listeners">
        <Listeners
          hostUserID={authInfo.username}
          hostDisplayName={authInfo.displayName}
          hostUserImg={authInfo.userImg}
        />
      </div>
      <div className="Broadcast-player">
        {player}
        {trackList}
      </div>
    </div>
  );
}

export default Broadcast;
