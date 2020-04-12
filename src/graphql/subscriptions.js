/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSongEvent = /* GraphQL */ `
  subscription OnCreateSongEvent($userID: String!) {
    onCreateSongEvent(userID: $userID) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
