import React from "react";
import Switch from "react-switch";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer.js";
import { useLocalStorage } from "@rehooks/local-storage";

export default function PowerHourControl() {
  const [phEnabled, setPhEnabled] = useLocalStorage("EMPhEnabled", false);
  const [phCount, setPhCount] = useLocalStorage("EMPhCount", 1);
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const phCallbackRef = React.useRef();

  const phCallback = (timeoutID) => {
    if (phEnabled) {
      spotifyWebPlayer.nextTrack();
      setPhCount(phCount + 1);
    } else {
      clearInterval(timeoutID);
    }
  };
  phCallbackRef.current = phCallback;

  const handleChange = React.useCallback(
    (enabled) => {
      setPhEnabled(enabled);
      if (enabled) {
        setPhCount(1);
        spotifyWebPlayer && spotifyWebPlayer.nextTrack();
      }
    },
    [setPhEnabled, setPhCount, spotifyWebPlayer]
  );

  React.useEffect(() => {
    if (phEnabled && spotifyWebPlayer) {
      const timeoutID = setInterval(() => {
        phCallbackRef.current(timeoutID);
      }, 60000);
      return () => {
        clearInterval(timeoutID);
      };
    }
  }, [phEnabled, spotifyWebPlayer, phCallbackRef]);

  return (
    <>
      <div className="Broadcast-controls">
        <label htmlFor="phToggle">Power hour mode</label>
        <Switch
          className="Broadcast-switch"
          id="phToggle"
          onChange={handleChange}
          checked={phEnabled}
        />
      </div>
      {phEnabled && <h1>{phCount}</h1>}
    </>
  );
}
