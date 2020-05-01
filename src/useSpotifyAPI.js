import React from "react";
import { SpotifyContext } from "./SpotifyContext";

export default function useSpotifyAPI() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext?.spotifyAPI;
}
