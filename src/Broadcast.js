import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer.js";
import Track from "./Track.js";
import TrackList from "./TrackList.js";
import "./Broadcast.css";
import { AuthContext } from "./Auth.js";
import BroadcastPublisher from "./BroadcastPublisher.js";
import PowerHourControl from "./PowerHourControl.js";
import EQBars from "./EQBars.js";

function Broadcast() {
  const authInfo = React.useContext(AuthContext);
  const [songHistory, setSongHistory] = React.useState(null);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const spotifyWebPlayer = useSpotifyWebPlayer();

  const handleSongEvent = React.useCallback(
    (track, songEvent) => {
      setSongHistory((h) =>
        [{ ...songEvent, track, id: Math.random() }].concat(h)
      );
      setCurrentTrack(track);
    },
    [setSongHistory, setCurrentTrack]
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

  if (authInfo == null) {
    return <div>Login to spotify to set the eardrum monster free</div>;
  }

  if (spotifyWebPlayer == null || songHistory == null) {
    return <div className="Broadcast">Initializing...</div>;
  }

  return (
    <div className="Broadcast">
      <PowerHourControl spotifyWebPlayer={spotifyWebPlayer} />
      <h1>Connected.</h1>
      <EQBars className="Broadcast-streaming" />
      <p>Now Playing:</p>
      <div className="Broadcast-currentTrack">
        <BroadcastPublisher
          currentTrack={currentTrack ?? songHistory[0]?.track}
          onSongEvent={handleSongEvent}
        />
        <Track track={currentTrack ?? songHistory[0]?.track} />
      </div>
      <div className="Broadcast-history">
        <TrackList songs={songHistory.slice(1)} />
      </div>
    </div>
  );
}

export default Broadcast;
