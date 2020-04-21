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
  const currentTrackRef = React.useRef(null);

  // Cache currentTrack locally to prevent high frequency duplicate updates
  if (currentTrackRef.current == null && currentTrack != null) {
    currentTrackRef.current = currentTrack;
  }

  const handlePlayerStateChanged = (newState) => {
    const newTrack = SpotifyWebPlayer.getTrackFromState(newState);
    const isSameTrack = newTrack?.uri === currentTrackRef?.current?.uri;
    const trackInProgress =
      Math.floor(Date.now() / 1000) - currentTrackRef?.current?.timestamp <
      currentTrackRef?.current?.durationMs / 1000;
    // Avoid updating if track is the same
    if (newTrack == null || (isSameTrack && !trackInProgress)) {
      return;
    }
    const songEvent = {
      userID: authInfo.username,
      timestamp: Math.floor(Date.now() / 1000),
      position: Math.floor(newState.position ?? 0),
      spotifyURI: newTrack.uri,
      type: "NEW_SONG",
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
    currentTrackRef.current = trackData;
    onSongEvent(trackData, songEvent);
    publishTrack(trackData).then(() => publishSongEvent(songEvent));
  };
  handlePlayerStateChangedRef.current = handlePlayerStateChanged;

  React.useEffect(() => {
    if (spotifyWebPlayer) {
      const changeListener = (newState) =>
        handlePlayerStateChangedRef.current(newState);
      const initFunc = {
        current: (id) => {
          if (id === spotifyWebPlayer.getDeviceID()) {
            // Request current state
            spotifyWebPlayer.fetchState().then((newState) => {
              handlePlayerStateChangedRef.current(newState);
            });
          } else {
            // Transfer playback to the web player
            spotifyWebPlayer.transferPlayback();
          }
        },
      };
      // Subscribe to future changes
      spotifyWebPlayer.addStateChangeListener(changeListener);

      // get current state or transfer playback
      spotifyWebPlayer.spotifyAPI.fetchCurrentDeviceID().then((id) => {
        initFunc.current(id);
      });

      // Remove the listener on unMount
      return () => {
        spotifyWebPlayer.removeStateChangeListener(changeListener);
        initFunc.current = () => {};
      };
    }
  }, [spotifyWebPlayer, handlePlayerStateChangedRef]);

  return null;
}
