import React from "react";
import { SpotifyContext } from "./SpotifyContext.js";

export default function useSpotifyAPI() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext?.spotifyAPI;
}
