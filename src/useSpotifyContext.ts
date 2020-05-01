import React from "react";
import { SpotifyContext } from "./SpotifyContext";

export default function useSpotifyContext() {
  const spotifyContext = React.useContext(SpotifyContext);
  return spotifyContext;
}
