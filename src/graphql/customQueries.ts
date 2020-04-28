export const usersByLatestSongEventCustom = /* GraphQL */ `
  query UsersByLatestSongEventCustom(
    $type: String
    $latestSongEvent: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByLatestSongEvent(
      type: $type
      latestSongEvent: $latestSongEvent
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userID
        displayName
        userImg
        latestSongEvent
        latestListenPing
        listeningTo
        songEvents(sortDirection: DESC) {
          items {
            id
            spotifyURI
            timestamp
            position
            userID
            type
            track {
              durationMs
              name
              albumName
              albumImg
            }
          }
          nextToken
        }
        listeners(sortDirection: DESC) {
          items {
            userID
            latestSongEvent
            latestListenPing
            listeningTo
            type
          }
          nextToken
        }
        type
      }
      nextToken
    }
  }
`;
