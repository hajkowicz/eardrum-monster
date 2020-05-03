import React from "react";
import Track from "./Track.js";
import { SongEvent } from "./Types.js";

export default function TrackList({ songs }: { songs: SongEvent[] }) {
  return (
    <>
      <h3>Recently played tracks</h3>
      {songs.map((song) => {
        if (song == null) {
          return null;
        }
        return <Track track={song.track} key={song.id} />;
      })}
    </>
  );
}
