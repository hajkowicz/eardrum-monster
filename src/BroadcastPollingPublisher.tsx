import React from "react";
import useSpotifyAPI from "./useSpotifyAPI";
import useAuth from "./useAuth";

import type { CreateSongEventInput, CreateTrackInput } from "./API";
import type { CurrentlyPlayingResponse } from "./SpotifyAPITypes";

export type BroadcastPublisherProps = {
  onSongEvent: (
    trackInput: CreateTrackInput,
    songEventInput: CreateSongEventInput
  ) => void;
};

export default function BroadcastPollingPublisher({
  onSongEvent,
}: BroadcastPublisherProps) {
  const authInfo = useAuth();
  const spotifyAPI = useSpotifyAPI();
  const handlePlayerStateChangedRef = React.useRef<
    (currentlyPlaying: CurrentlyPlayingResponse) => void
  >(() => {});

  const handlePlayerStateChanged = (
    currentlyPlaying: CurrentlyPlayingResponse
  ) => {
    const newTrack = currentlyPlaying?.item;
    const isPlaying = currentlyPlaying?.is_playing ?? false;
    if (newTrack == null || isPlaying === false || authInfo == null) {
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
      position: Math.floor(currentlyPlaying?.progress_ms ?? 0),
      spotifyURI: newTrack.uri,
      type: "NEW_SONG",
    };
    onSongEvent(track, songEvent);
  };
  handlePlayerStateChangedRef.current = handlePlayerStateChanged;

  React.useEffect(() => {});

  React.useEffect(() => {
    if (spotifyAPI) {
      const timeoutIDRef: { current: NodeJS.Timeout | null } = {
        current: null,
      };
      const fetchCurrentlyPlaying = () => {
        spotifyAPI.fetchCurrentlyPlaying().then((currentlyPlayingResponse) => {
          const progressMs = currentlyPlayingResponse?.progress_ms;
          const durationMs = currentlyPlayingResponse?.item?.duration_ms;
          // Poll more frequently earlier in the song
          const timeoutDuration =
            progressMs != null && durationMs != null && progressMs / 1000 < 30
              ? 4000
              : (durationMs - progressMs) / 1000 < 20
              ? 3000
              : 10000;
          handlePlayerStateChangedRef.current(currentlyPlayingResponse);
          timeoutIDRef.current = setTimeout(
            fetchCurrentlyPlaying,
            timeoutDuration
          );
        });
      };
      fetchCurrentlyPlaying();
      return () => {
        if (timeoutIDRef.current != null) {
          clearTimeout(timeoutIDRef.current);
        }
      };
    }
  }, [spotifyAPI, handlePlayerStateChangedRef]);

  return null;
}
