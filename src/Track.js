import React from "react";
import "./Track.css";
import logo from "./logo.png";

function Track({ track }) {
  console.log(track);
  return (
    <div className="Track">
      <img
        className="Track-albumImg"
        src={track?.albumImg ?? logo}
        alt="Album art"
      />
      <div className="Track-details">
        <p className="Track-name">{track?.name ?? "Unknown"}</p>
        <p className="Track-artist">{track?.artistName}</p>
      </div>
    </div>
  );
}

export default Track;
