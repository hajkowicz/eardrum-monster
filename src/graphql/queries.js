/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($userID: String!) {
    getUser(userID: $userID) {
      userID
      songEvents {
        items {
          id
          spotifyURI
          timestamp
          position
          userID
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
      userID
      user {
        userID
        songEvents {
          nextToken
        }
      }
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
        userID
        user {
          userID
        }
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
        userID
        user {
          userID
        }
      }
      nextToken
    }
  }
`;
