/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSongEvent = /* GraphQL */ `
  subscription OnCreateSongEvent($userID: String!) {
    onCreateSongEvent(userID: $userID) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTrack = /* GraphQL */ `
  subscription OnCreateTrack {
    onCreateTrack {
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
export const onUpdateTrack = /* GraphQL */ `
  subscription OnUpdateTrack {
    onUpdateTrack {
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
export const onDeleteTrack = /* GraphQL */ `
  subscription OnDeleteTrack {
    onDeleteTrack {
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
