import React from 'react';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';
import Switch from 'react-switch';
import SpotifyClient from './spotify.js';


function Broadcast({username, spotify}) {
    const [phEnabled, setPhEnabled] = React.useState(false);
    const [phCount, setPhCount] = React.useState(1);
    const [currentSong, setCurrentSong] = React.useState(null);
    const phEnabledRef = React.useRef(phEnabled);
    const phCountRef = React.useRef(phCount);
    phEnabledRef.current = phEnabled;
    phCountRef.current = phCount;
    // Ensure the user is created on mount
    React.useEffect(() => {
        if (username) {
            API.graphql(graphqlOperation(mutations.createUser, {input: {
                userID: username
            }})).catch(() => console.error('user creation failed'));
        }
    }, [username]);

    // initialize spotify web player
    React.useEffect(() => {
        if(spotify && username) {
            spotify.prepareSpotifyClient()
            .then(() => {
                spotify.fetchState().then(currentState => setCurrentSong(SpotifyClient.getUriFromState(currentState)));
                spotify.onPlayerStateChanged(data => {
                    if (data.newSong != null) {
                        const songEvent = {
                            userID: username,
                            timestamp: Math.floor(Date.now() / 100),
                            position: data.newState.position ?? 0,
                            spotifyURI: data.newSong.uri,
                        };
                        API.graphql(graphqlOperation(mutations.createSongEvent, {input: songEvent}));
                        setCurrentSong(data.newSong.uri);
                    }
                });
            });
        }
    }, [spotify, username]);

    React.useEffect(() => {
        if(phEnabled && spotify) {
            spotify.nextTrack();
            const timeoutID = setInterval(() => {
                if(phEnabledRef.current) {
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
        <>
      <label>
        <span>Power hour mode enabled</span>
        <Switch onChange={setPhEnabled} checked={phEnabled}/>
      </label>
      {phEnabled && <h1>{phCount}</h1>}
      <div>broadcasting: {currentSong}</div>
      </>
    );
}

export default Broadcast;
