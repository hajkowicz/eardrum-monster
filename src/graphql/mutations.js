/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        songEvents {
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
        songEvents {
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
        songEvents {
          nextToken
        }
      }
    }
  }
`;
