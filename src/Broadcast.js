import React from 'react';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';
import Switch from 'react-switch';
import SpotifyClient from './spotify.js';


function Broadcast({username, spotify}) {
    const [powerHourModeEnabled, setChecked] = React.useState(false);
    const [currentSong, setCurrentSong] = React.useState(null);
    const powerHourModeEnabledRef = React.useRef(powerHourModeEnabled);
    powerHourModeEnabledRef.current = powerHourModeEnabled;
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
                        API.graphql(graphqlOperation(mutations.createSongEvent, {input: songEvent})).then(data => console.log(data));
                        setCurrentSong(data.newSong.uri);
                    }
                });
            });
        }
    }, [spotify, username]);

    React.useEffect(() => {
        if(powerHourModeEnabled && spotify) {
            spotify.nextTrack();
            const timeoutID = setInterval(() => {
                if(powerHourModeEnabledRef.current) {
                    spotify.nextTrack();
                } else {
                    clearInterval(timeoutID);
                }
            }, 5000);
        }

    }, [powerHourModeEnabled, powerHourModeEnabledRef, spotify]);

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
        <Switch onChange={setChecked} checked={powerHourModeEnabled}/>
      </label>
      <div>broadcasting: {currentSong}</div>
      </>
    );
}

export default Broadcast;
