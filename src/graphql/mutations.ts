// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      userID
      latestSongEvent
      latestListenPing
      listeningTo
      songEvents {
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
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          type
        }
        nextToken
      }
      listeners {
        items {
          userID
          latestSongEvent
          latestListenPing
          listeningTo
          songEvents {
            nextToken
          }
          listeners {
            nextToken
          }
          displayName
          userImg
          type
        }
        nextToken
      }
      displayName
      userImg
      type
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      userID
      latestSongEvent
      latestListenPing
      listeningTo
      songEvents {
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
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          type
        }
        nextToken
      }
      listeners {
        items {
          userID
          latestSongEvent
          latestListenPing
          listeningTo
          songEvents {
            nextToken
          }
          listeners {
            nextToken
          }
          displayName
          userImg
          type
        }
        nextToken
      }
      displayName
      userImg
      type
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      userID
      latestSongEvent
      latestListenPing
      listeningTo
      songEvents {
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
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          type
        }
        nextToken
      }
      listeners {
        items {
          userID
          latestSongEvent
          latestListenPing
          listeningTo
          songEvents {
            nextToken
          }
          listeners {
            nextToken
          }
          displayName
          userImg
          type
        }
        nextToken
      }
      displayName
      userImg
      type
    }
  }
`;
export const createSongEvent = /* GraphQL */ `
  mutation CreateSongEvent(
    $input: CreateSongEventInput!
    $condition: ModelSongEventConditionInput
  ) {
    createSongEvent(input: $input, condition: $condition) {
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
        latestSongEvent
        latestListenPing
        listeningTo
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
        listeners {
          items {
            userID
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          nextToken
        }
        displayName
        userImg
        type
      }
      type
    }
  }
`;
export const updateSongEvent = /* GraphQL */ `
  mutation UpdateSongEvent(
    $input: UpdateSongEventInput!
    $condition: ModelSongEventConditionInput
  ) {
    updateSongEvent(input: $input, condition: $condition) {
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
        latestSongEvent
        latestListenPing
        listeningTo
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
        listeners {
          items {
            userID
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          nextToken
        }
        displayName
        userImg
        type
      }
      type
    }
  }
`;
export const deleteSongEvent = /* GraphQL */ `
  mutation DeleteSongEvent(
    $input: DeleteSongEventInput!
    $condition: ModelSongEventConditionInput
  ) {
    deleteSongEvent(input: $input, condition: $condition) {
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
        latestSongEvent
        latestListenPing
        listeningTo
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
        listeners {
          items {
            userID
            latestSongEvent
            latestListenPing
            listeningTo
            displayName
            userImg
            type
          }
          nextToken
        }
        displayName
        userImg
        type
      }
      type
    }
  }
`;
export const createTrack = /* GraphQL */ `
  mutation CreateTrack(
    $input: CreateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    createTrack(input: $input, condition: $condition) {
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
export const updateTrack = /* GraphQL */ `
  mutation UpdateTrack(
    $input: UpdateTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    updateTrack(input: $input, condition: $condition) {
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
export const deleteTrack = /* GraphQL */ `
  mutation DeleteTrack(
    $input: DeleteTrackInput!
    $condition: ModelTrackConditionInput
  ) {
    deleteTrack(input: $input, condition: $condition) {
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
