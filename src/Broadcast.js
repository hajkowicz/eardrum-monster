import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import Switch from "react-switch";
import SpotifyClient from "./spotify.js";
import Track from "./Track.js";
import "./Broadcast.css";

function publishSongEvent(songEvent) {
  return API.graphql(
    graphqlOperation(mutations.createSongEvent, {
      input: songEvent,
    })
  );
}

function publishTrack(track) {
  return API.graphql(graphqlOperation(mutations.createTrack, { input: track }));
}

function Broadcast({ username, spotify }) {
  const [phEnabled, setPhEnabled] = React.useState(false);
  const [phCount, setPhCount] = React.useState(1);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const phEnabledRef = React.useRef(phEnabled);
  const handleStateChangeRef = React.useRef(null);
  phEnabledRef.current = phEnabled;

  const handleStateChange = (newState) => {
    const track = SpotifyClient.getTrackFromState(newState);
    console.log("handling state change", track, currentTrack);
    // Avoid updating if track is the same
    if (track == null || track.uri === currentTrack?.uri) {
      return;
    }
    const songEvent = {
      userID: username,
      timestamp: Math.floor(Date.now() / 100),
      position: newState.position ?? 0,
      spotifyURI: track.uri,
    };
    const trackData = {
      uri: track.uri,
      trackID: track.id,
      name: track.name,
      durationMs: track.duration_ms,
      albumName: track.album.name,
      artistName: track.artists[0].name,
      albumImg: track.album.images[0].url,
    };
    setCurrentTrack(trackData);
    publishTrack(trackData).then(() => publishSongEvent(songEvent));
  };
  handleStateChangeRef.current = handleStateChange;

  // Ensure the user is created on mount
  React.useEffect(() => {
    if (username) {
      API.graphql(
        graphqlOperation(mutations.createUser, {
          input: {
            userID: username,
          },
        })
      ).catch(() => console.error("user creation failed"));
    }
  }, [username]);

  // initialize spotify web player
  React.useEffect(() => {
    if (spotify && username) {
      const lastSongEventPromise = API.graphql(
        graphqlOperation(queries.songEventsByUserId, {
          userID: username,
          sortDirection: "DESC",
          limit: 1,
        })
      ).catch(() => console.error("user creation failed"));

      // Subscribe to player changes once initial data has been fetched.
      Promise.all([spotify.prepareSpotifyClient(), lastSongEventPromise]).then(
        ([_, initialData]) => {
          const song = initialData?.data?.songEventsByUserID?.items[0];
          if (song !== null) {
            setCurrentTrack(song.track);
          }
          spotify
            .fetchState()
            .then((newState) => handleStateChangeRef.current(newState));
          spotify.onPlayerStateChanged((newState) =>
            handleStateChangeRef.current(newState)
          );
        }
      );
      return () => {
        handleStateChangeRef.current = () => {};
      };
    }
  }, [spotify, username]);

  React.useEffect(() => {
    if (phEnabled && spotify) {
      spotify.nextTrack();
      const timeoutID = setInterval(() => {
        if (phEnabledRef.current) {
          setPhCount((c) => c + 1);
          spotify.nextTrack();
        } else {
          clearInterval(timeoutID);
          setPhCount(1);
        }
      }, 60000);
    }
  }, [phEnabled, phEnabledRef, spotify]);

  if (username == null) {
    return <div>Login to spotify to set the eardrum monster free</div>;
  }

  if (spotify == null || currentTrack == null) {
    return <div className="Broadcast">Initializing spotify web player...</div>;
  }

  return (
    <div className="Broadcast">
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
      <h1>Connected.</h1>
      <p>Now Playing:</p>
      <div className="Broadcast-currentTrack">
        <Track track={currentTrack} />
      </div>
    </div>
  );
}

export default Broadcast;
