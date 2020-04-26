import type {
  CreateSongEventMutation,
  CreateTrackMutation,
  CreateUserMutation,
} from "./API";

export type SongEvent = CreateSongEventMutation["createSongEvent"];
export type Track = CreateTrackMutation["createTrack"];
export type User = CreateUserMutation["createUser"];
