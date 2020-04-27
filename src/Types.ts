import type {
  CreateSongEventMutation,
  CreateTrackMutation,
  CreateUserMutation,
} from "./API";

export type Track = CreateTrackMutation["createTrack"];
export type User = CreateUserMutation["createUser"];
export type SongEvent = CreateSongEventMutation["createSongEvent"];
