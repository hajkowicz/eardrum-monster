/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmUser = /* GraphQL */ `
  query GetEmUser($userID: String!) {
    getEMUser(userID: $userID) {
      userID
      songEvent {
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
export const listEmUsers = /* GraphQL */ `
  query ListEmUsers(
    $userID: String
    $filter: ModelEMUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEMUsers(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userID
        songEvent {
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
        songEvent {
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
