import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import * as mutations from "./graphql/mutations";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer";
import SpotifyWebPlayer from "./SpotifyWebPlayer";
import useAuth from "./useAuth";

import type { CreateSongEventInput, CreateTrackInput } from "./API";
import type { SongEvent } from "./Types";
import type { SpotifyWebPlayerState } from "./SpotifyWebPlayerTypes";

export type BroadcastPublisherProps = {
  currentSongEvent: SongEvent;
  onSongEvent: (songEvent: SongEvent) => void;
};

function publishSongEvent(username: string, songEvent: CreateSongEventInput) {
  API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        userID: username,
        latestSongEvent: songEvent.timestamp,
      },
    })
  );
  return API.graphql(
    graphqlOperation(mutations.createSongEvent, {
      input: songEvent,
    })
  );
}

function publishTrack(track: CreateTrackInput) {
  return API.graphql(
    graphqlOperation(mutations.createTrack, { input: track })
  ) as Promise<GraphQLResult>;
}

export default function BroadcastPublisher({
  currentSongEvent,
  onSongEvent,
}: BroadcastPublisherProps) {
  const authInfo = useAuth();
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const handlePlayerStateChangedRef = React.useRef<(newState: any) => void>(
    () => {}
  );
  const currentSongEventRef = React.useRef<SongEvent>(currentSongEvent);

  const handlePlayerStateChanged = (newState: SpotifyWebPlayerState) => {
    const newTrack = SpotifyWebPlayer.getTrackFromState(newState);
    console.log(newState);
    // If there is not a valid track, dont publish
    if (newTrack == null || authInfo == null) {
      return;
    }
    const isSameTrack =
      newTrack.uri === currentSongEventRef.current?.spotifyURI;
    const trackInProgress =
      currentSongEventRef.current != null &&
      currentSongEventRef.current.track != null &&
      currentSongEventRef.current.track.durationMs != null &&
      Math.floor(Date.now() / 1000) - currentSongEventRef.current.timestamp <
        currentSongEventRef.current.track.durationMs / 1000 + 60;
    // Avoid updating if track is the same
    if (isSameTrack && trackInProgress) {
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
    const localSongEvent = {
      ...songEvent,
      __typename: "SongEvent" as "SongEvent",
      track: {
        __typename: "Track" as "Track",
        ...track,
      },
      id: Math.random().toString(),
      user: null,
    };
    currentSongEventRef.current = localSongEvent;
    onSongEvent(localSongEvent);
    publishTrack(track).then(() => {
      publishSongEvent(authInfo.username, songEvent);
    });
  };
  handlePlayerStateChangedRef.current = handlePlayerStateChanged;

  React.useEffect(() => {
    if (spotifyWebPlayer) {
      const changeListener = (newState: any) =>
        handlePlayerStateChangedRef.current(newState);
      const initFunc = {
        current: (id: any) => {
          if (id === spotifyWebPlayer.getDeviceID()) {
            // Request current state
            spotifyWebPlayer.fetchState().then((newState: any) => {
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
      spotifyWebPlayer.spotifyAPI.fetchCurrentDeviceID().then((id: any) => {
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
