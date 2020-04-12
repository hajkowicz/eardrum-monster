/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmUser = /* GraphQL */ `
  mutation CreateEmUser(
    $input: CreateEMUserInput!
    $condition: ModelEMUserConditionInput
  ) {
    createEMUser(input: $input, condition: $condition) {
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
export const updateEmUser = /* GraphQL */ `
  mutation UpdateEmUser(
    $input: UpdateEMUserInput!
    $condition: ModelEMUserConditionInput
  ) {
    updateEMUser(input: $input, condition: $condition) {
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
export const deleteEmUser = /* GraphQL */ `
  mutation DeleteEmUser(
    $input: DeleteEMUserInput!
    $condition: ModelEMUserConditionInput
  ) {
    deleteEMUser(input: $input, condition: $condition) {
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
