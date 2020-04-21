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

export default function BroadcastPublisher({ currentSongEvent, onSongEvent }) {
  const authInfo = React.useContext(AuthContext);
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const handlePlayerStateChangedRef = React.useRef(null);
  const currentSongEventRef = React.useRef(null);

  // Cache currentTrack locally to prevent high frequency duplicate updates
  if (currentSongEventRef.current == null && currentSongEvent != null) {
    currentSongEventRef.current = currentSongEvent;
  }

  const handlePlayerStateChanged = (newState) => {
    const newTrack = SpotifyWebPlayer.getTrackFromState(newState);
    const isSameTrack =
      newTrack?.uri === currentSongEventRef?.current?.spotifyURI;
    const trackInProgress =
      Math.floor(Date.now() / 1000) - currentSongEventRef?.current?.timestamp <
      currentSongEventRef?.current?.track?.durationMs / 1000;
    // Avoid updating if track is the same
    if (newTrack == null || (isSameTrack && trackInProgress)) {
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
    const localSongEvent = {
      ...songEvent,
      track: trackData,
      id: Math.random(),
    };
    currentSongEventRef.current = localSongEvent;
    onSongEvent(localSongEvent);
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
