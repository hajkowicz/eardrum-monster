import React from "react";
import Switch from "react-switch";
import useSpotifyAPI from "./useSpotifyAPI";
import { useLocalStorage } from "@rehooks/local-storage";

export default function PowerHourControl() {
  const [phEnabled, setPhEnabled] = useLocalStorage("EMPhEnabled", false);
  const [phCount, setPhCount] = useLocalStorage("EMPhCount", 1);
  const spotifyAPI = useSpotifyAPI();
  const phCallbackRef = React.useRef();

  const phCallback = (timeoutID) => {
    if (phEnabled) {
      spotifyAPI.nextTrack();
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
        spotifyAPI && spotifyAPI.nextTrack();
      }
    },
    [setPhEnabled, setPhCount, spotifyAPI]
  );

  React.useEffect(() => {
    if (phEnabled) {
      const timeoutID = setInterval(() => {
        phCallbackRef.current(timeoutID);
      }, 60000);
      return () => {
        clearInterval(timeoutID);
      };
    }
  }, [phEnabled, phCallbackRef]);

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
