import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import * as mutations from "./graphql/mutations";
import useSpotifyWebPlayer, {
  useSpotifyWebPlayerUnsupported,
} from "./useSpotifyWebPlayer";
import useAuth from "./useAuth";
import BroadcastPollingPublisher from "./BroadcastPollingPublisher";
import BroadcastWebPlayerPublisher from "./BroadcastWebPlayerPublisher";

import type { CreateSongEventInput, CreateTrackInput } from "./API";
import type { SongEvent } from "./Types";

export type BroadcastPublisherProps = {
  currentSongEvent: SongEvent;
  onSongEvent: (songEvent: SongEvent) => void;
};

function publishSongEvent(songEvent: CreateSongEventInput) {
  return API.graphql(
    graphqlOperation(mutations.createSongEvent, {
      input: songEvent,
    })
  );
}

function publishBroadcastPing(username: string) {
  API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: {
        userID: username,
        latestSongEvent: Math.floor(Date.now() / 1000),
      },
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
  const webPlayerUnsupported = useSpotifyWebPlayerUnsupported();
  const currentSongEventRef = React.useRef<SongEvent>(currentSongEvent);

  const handleNewSongEvent = (
    track: CreateTrackInput,
    songEvent: CreateSongEventInput
  ) => {
    const isSameTrack =
      songEvent.spotifyURI === currentSongEventRef.current?.spotifyURI;
    if (isSameTrack) {
      return;
    }
    const localSongEvent = {
      __typename: "SongEvent" as "SongEvent",
      ...songEvent,
      track: {
        __typename: "Track" as "Track",
        ...track,
      },
      id: Math.random().toString(),
      user: null,
    };
    currentSongEventRef.current = localSongEvent as SongEvent;
    onSongEvent(localSongEvent as SongEvent);
    publishTrack(track).then(() => {
      publishSongEvent(songEvent);
    });
  };

  React.useEffect(() => {
    if (authInfo) {
      publishBroadcastPing(authInfo.username);
      const intervalID = setInterval(() => {
        publishBroadcastPing(authInfo.username);
      }, 10000);
      return () => clearInterval(intervalID);
    }
  }, [authInfo]);

  if (spotifyWebPlayer) {
    return <BroadcastWebPlayerPublisher onSongEvent={handleNewSongEvent} />;
  }
  if (webPlayerUnsupported) {
    return <BroadcastPollingPublisher onSongEvent={handleNewSongEvent} />;
  }
  return null;
}
