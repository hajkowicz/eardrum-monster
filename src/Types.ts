import type {
  CreateSongEventMutation,
  CreateTrackMutation,
  CreateUserMutation,
} from "./API";

export type Track = CreateTrackMutation["createTrack"];
export type User = Exclude<CreateUserMutation["createUser"], null>;
export type SongEvent = CreateSongEventMutation["createSongEvent"];
