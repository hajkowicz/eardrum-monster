import React from "react";
import Track from "./Track.js";

export default function TrackList({ songs }) {
  return (
    <>
      <h3>Recently played tracks</h3>
      {songs.map((song) => (
        <div key={song.id} className="Listen-track">
          <Track track={song.track} />
        </div>
      ))}
    </>
  );
}
