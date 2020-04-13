import React from "react";
import "./Track.css";

function Track({ track }) {
  console.log(track);
  return (
    <div className="Track">
      <img className="Track-albumImg" src={track?.albumImg} alt="Album art" />
      <div className="Track-details">
        <p className="Track-name">{track?.name ?? "Unknown"}</p>
        <p className="Track-artist">{track?.artistName}</p>
      </div>
    </div>
  );
}

export default Track;
