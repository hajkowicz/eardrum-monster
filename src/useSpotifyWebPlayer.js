import React from "react";
import { SpotifyContext } from "./SpotifyContext";

export function useSpotifyWebPlayerUnsupported() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext.webPlayerUnsupported;
}

export default function useSpotifyWebPlayer() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext?.webPlayer;
}
