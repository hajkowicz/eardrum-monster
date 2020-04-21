/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($userID: String!) {
    getUser(userID: $userID) {
      userID
      latestEvent
      songEvents {
        items {
          id
          spotifyURI
          timestamp
          position
          userID
          type
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userID: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        latestEvent
        songEvents {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSongEvent = /* GraphQL */ `
  query GetSongEvent($id: ID!) {
    getSongEvent(id: $id) {
      id
      spotifyURI
      timestamp
      position
      track {
        uri
        trackID
        name
        durationMs
        albumName
        artistName
        albumImg
      }
      userID
      user {
        userID
        latestEvent
        songEvents {
          nextToken
        }
      }
      type
    }
  }
`;
export const listSongEvents = /* GraphQL */ `
  query ListSongEvents(
    $filter: ModelSongEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        spotifyURI
        timestamp
        position
        track {
          uri
          trackID
          name
          durationMs
          albumName
          artistName
          albumImg
        }
        userID
        user {
          userID
          latestEvent
        }
        type
      }
      nextToken
    }
  }
`;
export const getTrack = /* GraphQL */ `
  query GetTrack($uri: String!) {
    getTrack(uri: $uri) {
      uri
      trackID
      name
      durationMs
      albumName
      artistName
      albumImg
    }
  }
`;
export const listTracks = /* GraphQL */ `
  query ListTracks(
    $uri: String
    $filter: ModelTrackFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTracks(
      uri: $uri
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        uri
        trackID
        name
        durationMs
        albumName
        artistName
        albumImg
      }
      nextToken
    }
  }
`;
export const songEventsByUserId = /* GraphQL */ `
  query SongEventsByUserId(
    $userID: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSongEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songEventsByUserID(
      userID: $userID
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        spotifyURI
        timestamp
        position
        track {
          uri
          trackID
          name
          durationMs
          albumName
          artistName
          albumImg
        }
        userID
        user {
          userID
          latestEvent
        }
        type
      }
      nextToken
    }
  }
`;
export const songEventsByType = /* GraphQL */ `
  query SongEventsByType(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSongEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songEventsByType(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        spotifyURI
        timestamp
        position
        track {
          uri
          trackID
          name
          durationMs
          albumName
          artistName
          albumImg
        }
        userID
        user {
          userID
          latestEvent
        }
        type
      }
      nextToken
    }
  }
`;
