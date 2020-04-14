import React from "react";
import { SpotifyContext } from "./SpotifyContext.js";

export default function useSpotifyWebPlayer() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext?.webPlayer;
}
