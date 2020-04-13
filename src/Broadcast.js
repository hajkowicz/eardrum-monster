import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import Switch from "react-switch";
import SpotifyClient from "./spotify.js";
import Track from "./Track.js";
import "./Broadcast.css";

function Broadcast({ username, spotify }) {
  const [phEnabled, setPhEnabled] = React.useState(false);
  const [phCount, setPhCount] = React.useState(1);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const phEnabledRef = React.useRef(phEnabled);
  const phCountRef = React.useRef(phCount);
  phEnabledRef.current = phEnabled;
  phCountRef.current = phCount;
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
      spotify.prepareSpotifyClient().then(() => {
        spotify.fetchState().then((currentState) => {
          const track = SpotifyClient.getTrackFromState(currentState);
          if (track == null) {
            return;
          }
          const trackData = {
            uri: track.uri,
            trackID: track.id,
            name: track.name,
            durationMs: track.duration_ms,
            albumName: track.album.name,
            artistName: track.artists[0].name,
            albumImg: track.album.images[0].url,
          };
          setCurrentTrack(SpotifyClient.getUriFromState(trackData));
        });
        spotify.onPlayerStateChanged((data) => {
          console.log(data.newState);
          if (data.newSong != null) {
            const track = SpotifyClient.getTrackFromState(data.newState);
            const songEvent = {
              userID: username,
              timestamp: Math.floor(Date.now() / 100),
              position: data.newState.position ?? 0,
              spotifyURI: data.newSong.uri,
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
            API.graphql(
              graphqlOperation(mutations.createTrack, { input: trackData })
            ).then(() => {
              API.graphql(
                graphqlOperation(mutations.createSongEvent, {
                  input: songEvent,
                })
              );
            });
            setCurrentTrack(trackData);
          }
        });
      });
    }
  }, [spotify, username]);

  React.useEffect(() => {
    if (phEnabled && spotify) {
      spotify.nextTrack();
      const timeoutID = setInterval(() => {
        if (phEnabledRef.current) {
          setPhCount(phCountRef.current + 1);
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

  if (spotify == null) {
    return <div>Initializing spotify web player...</div>;
  }

  return (
    <div className="Broadcast">
      <div className="Broadcast-controls">
        <label for="phToggle">Power hour mode</label>
        <Switch
          className="Broadcast-switch"
          id="phToggle"
          onChange={setPhEnabled}
          checked={phEnabled}
        />
      </div>
      {phEnabled && <h1>{phCount}</h1>}
      <div className="Broadcast-currentTrack">
        <Track track={currentTrack} />
      </div>
    </div>
  );
}

export default Broadcast;
