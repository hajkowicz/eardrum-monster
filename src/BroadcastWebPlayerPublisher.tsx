import React from "react";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer";
import SpotifyWebPlayer from "./SpotifyWebPlayer";
import useAuth from "./useAuth";

import type { CreateSongEventInput, CreateTrackInput } from "./API";
import type { SpotifyWebPlayerState } from "./SpotifyWebPlayerTypes";

export type BroadcastPublisherProps = {
  onSongEvent: (
    trackInput: CreateTrackInput,
    songEventInput: CreateSongEventInput
  ) => void;
};

export default function BroadcastWebPlayerPublisher({
  onSongEvent,
}: BroadcastPublisherProps) {
  const authInfo = useAuth();
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const handlePlayerStateChangedRef = React.useRef<(newState: any) => void>(
    () => {}
  );

  const handlePlayerStateChanged = (newState: SpotifyWebPlayerState) => {
    const newTrack = SpotifyWebPlayer.getTrackFromState(newState);
    // If there is not a valid track, dont publish
    if (newTrack == null || authInfo == null) {
      return;
    }
    const track = {
      uri: newTrack.uri,
      trackID: newTrack.id,
      name: newTrack.name,
      durationMs: newTrack.duration_ms,
      albumName: newTrack.album.name,
      artistName: newTrack.artists[0].name,
      albumImg: newTrack.album.images[0].url,
    };
    const songEvent = {
      userID: authInfo.username,
      timestamp: Math.floor(Date.now() / 1000),
      position: Math.floor(newState.position ?? 0),
      spotifyURI: newTrack.uri,
      type: "NEW_SONG",
    };

    onSongEvent(track, songEvent);
  };
  handlePlayerStateChangedRef.current = handlePlayerStateChanged;

  React.useEffect(() => {
    if (spotifyWebPlayer != null) {
      const changeListener = (newState: any) =>
        handlePlayerStateChangedRef.current(newState);
      const initFunc = {
        current: (id: any) => {
          if (id === spotifyWebPlayer.getDeviceID() || id == null) {
            // Request current state
            spotifyWebPlayer.fetchState().then((newState: any) => {
              handlePlayerStateChangedRef.current(newState);
            });
            spotifyWebPlayer.resume();
          } else {
            // Transfer playback to the web player
            spotifyWebPlayer.transferPlayback();
          }
        },
      };
      // Subscribe to future changes
      spotifyWebPlayer.addStateChangeListener(changeListener);

      // get current state or transfer playback
      spotifyWebPlayer.spotifyAPI.fetchCurrentDeviceID().then((id: any) => {
        initFunc.current(id);
      });

      // Remove the listener on unMount
      return () => {
        spotifyWebPlayer.removeStateChangeListener(changeListener);
        initFunc.current = () => {};
        spotifyWebPlayer.pause();
      };
    }
  }, [spotifyWebPlayer, handlePlayerStateChangedRef]);

  return null;
}
