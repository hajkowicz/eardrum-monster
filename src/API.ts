/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  userID: string;
  latestEvent?: number | null;
};

export type ModelUserConditionInput = {
  latestEvent?: ModelIntInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type UpdateUserInput = {
  userID: string;
  latestEvent?: number | null;
};

export type DeleteUserInput = {
  userID: string;
};

export type CreateSongEventInput = {
  id?: string | null;
  spotifyURI: string;
  timestamp: number;
  position: number;
  userID: string;
  type: string;
};

export type ModelSongEventConditionInput = {
  spotifyURI?: ModelStringInput | null;
  timestamp?: ModelIntInput | null;
  position?: ModelIntInput | null;
  userID?: ModelStringInput | null;
  type?: ModelStringInput | null;
  and?: Array<ModelSongEventConditionInput | null> | null;
  or?: Array<ModelSongEventConditionInput | null> | null;
  not?: ModelSongEventConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateSongEventInput = {
  id: string;
  spotifyURI?: string | null;
  timestamp?: number | null;
  position?: number | null;
  userID?: string | null;
  type?: string | null;
};

export type DeleteSongEventInput = {
  id?: string | null;
};

export type CreateTrackInput = {
  uri: string;
  trackID?: string | null;
  name?: string | null;
  durationMs?: number | null;
  albumName?: string | null;
  artistName?: string | null;
  albumImg?: string | null;
};

export type ModelTrackConditionInput = {
  trackID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  durationMs?: ModelIntInput | null;
  albumName?: ModelStringInput | null;
  artistName?: ModelStringInput | null;
  albumImg?: ModelStringInput | null;
  and?: Array<ModelTrackConditionInput | null> | null;
  or?: Array<ModelTrackConditionInput | null> | null;
  not?: ModelTrackConditionInput | null;
};

export type UpdateTrackInput = {
  uri: string;
  trackID?: string | null;
  name?: string | null;
  durationMs?: number | null;
  albumName?: string | null;
  artistName?: string | null;
  albumImg?: string | null;
};

export type DeleteTrackInput = {
  uri: string;
};

export type ModelUserFilterInput = {
  userID?: ModelStringInput | null;
  latestEvent?: ModelIntInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelSongEventFilterInput = {
  id?: ModelIDInput | null;
  spotifyURI?: ModelStringInput | null;
  timestamp?: ModelIntInput | null;
  position?: ModelIntInput | null;
  userID?: ModelStringInput | null;
  type?: ModelStringInput | null;
  and?: Array<ModelSongEventFilterInput | null> | null;
  or?: Array<ModelSongEventFilterInput | null> | null;
  not?: ModelSongEventFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelTrackFilterInput = {
  uri?: ModelStringInput | null;
  trackID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  durationMs?: ModelIntInput | null;
  albumName?: ModelStringInput | null;
  artistName?: ModelStringInput | null;
  albumImg?: ModelStringInput | null;
  and?: Array<ModelTrackFilterInput | null> | null;
  or?: Array<ModelTrackFilterInput | null> | null;
  not?: ModelTrackFilterInput | null;
};

export type ModelIntKeyConditionInput = {
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreateSongEventMutationVariables = {
  input: CreateSongEventInput;
  condition?: ModelSongEventConditionInput | null;
};

export type CreateSongEventMutation = {
  createSongEvent: {
    __typename: "SongEvent";
    id: string;
    spotifyURI: string;
    timestamp: number;
    position: number;
    track: {
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null;
    userID: string;
    user: {
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null;
    type: string;
  } | null;
};

export type UpdateSongEventMutationVariables = {
  input: UpdateSongEventInput;
  condition?: ModelSongEventConditionInput | null;
};

export type UpdateSongEventMutation = {
  updateSongEvent: {
    __typename: "SongEvent";
    id: string;
    spotifyURI: string;
    timestamp: number;
    position: number;
    track: {
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null;
    userID: string;
    user: {
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null;
    type: string;
  } | null;
};

export type DeleteSongEventMutationVariables = {
  input: DeleteSongEventInput;
  condition?: ModelSongEventConditionInput | null;
};

export type DeleteSongEventMutation = {
  deleteSongEvent: {
    __typename: "SongEvent";
    id: string;
    spotifyURI: string;
    timestamp: number;
    position: number;
    track: {
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null;
    userID: string;
    user: {
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null;
    type: string;
  } | null;
};

export type CreateTrackMutationVariables = {
  input: CreateTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type CreateTrackMutation = {
  createTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type UpdateTrackMutationVariables = {
  input: UpdateTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type UpdateTrackMutation = {
  updateTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type DeleteTrackMutationVariables = {
  input: DeleteTrackInput;
  condition?: ModelTrackConditionInput | null;
};

export type DeleteTrackMutation = {
  deleteTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type GetUserQueryVariables = {
  userID: string;
};

export type GetUserQuery = {
  getUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListUsersQueryVariables = {
  userID?: string | null;
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListUsersQuery = {
  listUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetSongEventQueryVariables = {
  id: string;
};

export type GetSongEventQuery = {
  getSongEvent: {
    __typename: "SongEvent";
    id: string;
    spotifyURI: string;
    timestamp: number;
    position: number;
    track: {
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null;
    userID: string;
    user: {
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null;
    type: string;
  } | null;
};

export type ListSongEventsQueryVariables = {
  filter?: ModelSongEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListSongEventsQuery = {
  listSongEvents: {
    __typename: "ModelSongEventConnection";
    items: Array<{
      __typename: "SongEvent";
      id: string;
      spotifyURI: string;
      timestamp: number;
      position: number;
      track: {
        __typename: "Track";
        uri: string;
        trackID: string | null;
        name: string | null;
        durationMs: number | null;
        albumName: string | null;
        artistName: string | null;
        albumImg: string | null;
      } | null;
      userID: string;
      user: {
        __typename: "User";
        userID: string;
        latestEvent: number | null;
        songEvents: {
          __typename: "ModelSongEventConnection";
          nextToken: string | null;
        } | null;
      } | null;
      type: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetTrackQueryVariables = {
  uri: string;
};

export type GetTrackQuery = {
  getTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type ListTracksQueryVariables = {
  uri?: string | null;
  filter?: ModelTrackFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListTracksQuery = {
  listTracks: {
    __typename: "ModelTrackConnection";
    items: Array<{
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type SongEventsByUserIdQueryVariables = {
  userID?: string | null;
  timestamp?: ModelIntKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelSongEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type SongEventsByUserIdQuery = {
  songEventsByUserID: {
    __typename: "ModelSongEventConnection";
    items: Array<{
      __typename: "SongEvent";
      id: string;
      spotifyURI: string;
      timestamp: number;
      position: number;
      track: {
        __typename: "Track";
        uri: string;
        trackID: string | null;
        name: string | null;
        durationMs: number | null;
        albumName: string | null;
        artistName: string | null;
        albumImg: string | null;
      } | null;
      userID: string;
      user: {
        __typename: "User";
        userID: string;
        latestEvent: number | null;
        songEvents: {
          __typename: "ModelSongEventConnection";
          nextToken: string | null;
        } | null;
      } | null;
      type: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type SongEventsByTypeQueryVariables = {
  type?: string | null;
  timestamp?: ModelIntKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelSongEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type SongEventsByTypeQuery = {
  songEventsByType: {
    __typename: "ModelSongEventConnection";
    items: Array<{
      __typename: "SongEvent";
      id: string;
      spotifyURI: string;
      timestamp: number;
      position: number;
      track: {
        __typename: "Track";
        uri: string;
        trackID: string | null;
        name: string | null;
        durationMs: number | null;
        albumName: string | null;
        artistName: string | null;
        albumImg: string | null;
      } | null;
      userID: string;
      user: {
        __typename: "User";
        userID: string;
        latestEvent: number | null;
        songEvents: {
          __typename: "ModelSongEventConnection";
          nextToken: string | null;
        } | null;
      } | null;
      type: string;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateSongEventSubscriptionVariables = {
  userID: string;
};

export type OnCreateSongEventSubscription = {
  onCreateSongEvent: {
    __typename: "SongEvent";
    id: string;
    spotifyURI: string;
    timestamp: number;
    position: number;
    track: {
      __typename: "Track";
      uri: string;
      trackID: string | null;
      name: string | null;
      durationMs: number | null;
      albumName: string | null;
      artistName: string | null;
      albumImg: string | null;
    } | null;
    userID: string;
    user: {
      __typename: "User";
      userID: string;
      latestEvent: number | null;
      songEvents: {
        __typename: "ModelSongEventConnection";
        items: Array<{
          __typename: "SongEvent";
          id: string;
          spotifyURI: string;
          timestamp: number;
          position: number;
          userID: string;
          type: string;
        } | null> | null;
        nextToken: string | null;
      } | null;
    } | null;
    type: string;
  } | null;
};

export type OnCreateUserSubscription = {
  onCreateUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser: {
    __typename: "User";
    userID: string;
    latestEvent: number | null;
    songEvents: {
      __typename: "ModelSongEventConnection";
      items: Array<{
        __typename: "SongEvent";
        id: string;
        spotifyURI: string;
        timestamp: number;
        position: number;
        track: {
          __typename: "Track";
          uri: string;
          trackID: string | null;
          name: string | null;
          durationMs: number | null;
          albumName: string | null;
          artistName: string | null;
          albumImg: string | null;
        } | null;
        userID: string;
        user: {
          __typename: "User";
          userID: string;
          latestEvent: number | null;
        } | null;
        type: string;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreateTrackSubscription = {
  onCreateTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type OnUpdateTrackSubscription = {
  onUpdateTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};

export type OnDeleteTrackSubscription = {
  onDeleteTrack: {
    __typename: "Track";
    uri: string;
    trackID: string | null;
    name: string | null;
    durationMs: number | null;
    albumName: string | null;
    artistName: string | null;
    albumImg: string | null;
  } | null;
};
