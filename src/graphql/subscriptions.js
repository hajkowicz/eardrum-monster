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
        songEvent {
          nextToken
        }
      }
    }
  }
`;
export const onCreateEmUser = /* GraphQL */ `
  subscription OnCreateEmUser {
    onCreateEMUser {
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
export const onUpdateEmUser = /* GraphQL */ `
  subscription OnUpdateEmUser {
    onUpdateEMUser {
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
export const onDeleteEmUser = /* GraphQL */ `
  subscription OnDeleteEmUser {
    onDeleteEMUser {
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
