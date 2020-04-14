import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer.js";
import SpotifyWebPlayer from "./SpotifyWebPlayer.js";
import { AuthContext } from "./Auth.js";

function publishSongEvent(songEvent) {
  return API.graphql(
    graphqlOperation(mutations.createSongEvent, {
      input: songEvent,
    })
  );
}

function publishTrack(track) {
  return API.graphql(graphqlOperation(mutations.createTrack, { input: track }));
}

export default function BroadcastPublisher({ currentTrack, onSongEvent }) {
  const authInfo = React.useContext(AuthContext);
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const handlePlayerStateChangedRef = React.useRef(null);

  const handlePlayerStateChanged = (newState) => {
    const newTrack = SpotifyWebPlayer.getTrackFromState(newState);
    // Avoid updating if track is the same
    if (newTrack == null || newTrack.uri === currentTrack.uri) {
      return;
    }
    const songEvent = {
      userID: authInfo.username,
      timestamp: Math.floor(Date.now() / 100),
      position: Math.floor(newState.position ?? 0),
      spotifyURI: newTrack.uri,
    };
    const trackData = {
      uri: newTrack.uri,
      trackID: newTrack.id,
      name: newTrack.name,
      durationMs: newTrack.duration_ms,
      albumName: newTrack.album.name,
      artistName: newTrack.artists[0].name,
      albumImg: newTrack.album.images[0].url,
    };
    onSongEvent(trackData, songEvent);
    publishTrack(trackData).then(() => publishSongEvent(songEvent));
  };
  handlePlayerStateChangedRef.current = handlePlayerStateChanged;

  React.useEffect(() => {
    if (spotifyWebPlayer) {
      // Request the initial state
      spotifyWebPlayer
        .fetchState()
        .then((newState) => handlePlayerStateChangedRef.current(newState));
      // Subscribe to future changes
      spotifyWebPlayer.onPlayerStateChanged((newState) =>
        handlePlayerStateChangedRef.current(newState)
      );
      // Transfer playback to the web player
      spotifyWebPlayer.transferPlayback();
    }
  }, [spotifyWebPlayer, handlePlayerStateChangedRef]);

  return null;
}
