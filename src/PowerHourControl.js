import React from "react";
import Switch from "react-switch";
import useSpotifyAPI from "./useSpotifyAPI";
import { useLocalStorage } from "@rehooks/local-storage";
import useSpotifyContext from "./useSpotifyContext";
import PowerHourInfo from "./PowerHourInfo";

export default function PowerHourControl() {
  const [phEnabled, setPhEnabled] = useLocalStorage("EMPhEnabled", false);
  const [phCount, setPhCount] = useLocalStorage("EMPhCount", 1);
  const spotifyAPI = useSpotifyAPI();
  const phCallbackRef = React.useRef();
  const { setLastMutationTimestamp } = useSpotifyContext();

  const nextTrack = React.useCallback(() => {
    spotifyAPI
      .nextTrack()
      .then(() => {
        setLastMutationTimestamp(Date.now());
      })
      .catch(() => {
        console.error("error playing next track");
      });
  }, [spotifyAPI, setLastMutationTimestamp]);

  const phCallback = (timeoutID) => {
    if (phEnabled) {
      setPhCount(phCount + 1);
      nextTrack();
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
        if (spotifyAPI) {
          nextTrack();
        }
      }
    },
    [setPhEnabled, setPhCount, spotifyAPI, nextTrack]
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
      <PowerHourInfo count={phCount} isEnabled={phEnabled} />
    </>
  );
}
