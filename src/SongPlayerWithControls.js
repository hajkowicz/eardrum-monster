import React from "react";
import useSpotifyAPI from "./useSpotifyAPI.js";
import useSpotifyWebPlayer from "./useSpotifyWebPlayer.js";

export default function SongPlayerWithControls({ song }) {
  const spotifyAPI = useSpotifyAPI();
  const spotifyWebPlayer = useSpotifyWebPlayer();
  const [activeDeviceID, setActiveDeviceID] = React.useState(null);
  const [devices, setDevices] = React.useState(null);

  const eardrumPlayer = spotifyWebPlayer && {
    id: spotifyWebPlayer.getDeviceID(),
    name: "eardrum.monster",
  };
  const deviceList = devices ?? [];
  if (
    eardrumPlayer != null &&
    !deviceList.find((d) => d.id === eardrumPlayer.id)
  ) {
    deviceList.push(eardrumPlayer);
  }

  // Fetch devices
  React.useEffect(() => {
    spotifyAPI &&
      spotifyAPI.fetchDevices().then((data) => {
        setDevices(data.devices);
      });
  }, [spotifyAPI]);

  // Use web player if there is no active device
  React.useEffect(() => {
    if (spotifyAPI && devices) {
      const activeDevice = devices.find((device) => device.is_active === true);
      if (activeDevice) {
        setActiveDeviceID(activeDevice.id);
        return;
      } else if (spotifyWebPlayer) {
        setActiveDeviceID(spotifyWebPlayer.getDeviceID());
      }
    }
  }, [spotifyAPI, devices, spotifyWebPlayer]);

  React.useEffect(() => {
    activeDeviceID &&
      spotifyAPI &&
      spotifyAPI.play(song.spotifyURI, activeDeviceID);
  }, [spotifyAPI, activeDeviceID, song]);

  const handleChange = (event) => {
    setActiveDeviceID(event.target.value);
  };

  return (
    <div className="Listen-controls">
      <div>Playing on device:</div>
      <select value={activeDeviceID ?? ""} onChange={handleChange}>
        {deviceList?.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
    </div>
  );
}
