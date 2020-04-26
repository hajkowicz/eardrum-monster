export interface SpotifyWebPlayerState {
  context: Context;
  bitrate: number;
  position: number;
  duration: number;
  paused: boolean;
  shuffle: boolean;
  repeat_mode: number;
  track_window: TrackWindow;
  timestamp: number;
  restrictions: Restrictions;
  disallows: Disallows;
}
export interface Context {
  uri: string;
  metadata: Metadata;
}
export interface Metadata {}
export interface TrackWindow {
  current_track: NextTracksEntityOrPreviousTracksEntityOrCurrentTrack;
  next_tracks?: NextTracksEntityOrPreviousTracksEntityOrCurrentTrack[] | null;
  previous_tracks?:
    | NextTracksEntityOrPreviousTracksEntityOrCurrentTrack[]
    | null;
}
export interface NextTracksEntityOrPreviousTracksEntityOrCurrentTrack {
  id: string;
  uri: string;
  type: string;
  linked_from_uri?: null;
  linked_from: LinkedFrom;
  media_type: string;
  name: string;
  duration_ms: number;
  artists?: ArtistsEntity[] | null;
  album: Album;
  is_playable: boolean;
}
export interface LinkedFrom {
  uri?: null;
  id?: null;
}
export interface ArtistsEntity {
  name: string;
  uri: string;
}
export interface Album {
  uri: string;
  name: string;
  images?: ImagesEntity[] | null;
}
export interface ImagesEntity {
  url: string;
  height: number;
  width: number;
}
export interface Restrictions {
  disallow_resuming_reasons?: string[] | null;
}
export interface Disallows {
  resuming: boolean;
}
