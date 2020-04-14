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
    if (phEnabled && spotifyWebPlayer) {
      setPhCount((c) => c + 1);
      spotifyWebPlayer.nextTrack();
    } else {
      clearInterval(timeoutID);
      setPhCount(1);
    }
  };
  phCallbackRef.current = phCallback;

  React.useEffect(() => {
    if (phEnabled && spotifyWebPlayer) {
      spotifyWebPlayer.nextTrack();
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
          onChange={setPhEnabled}
          checked={phEnabled}
        />
      </div>
      {phEnabled && <h1>{phCount}</h1>}
    </>
  );
}
