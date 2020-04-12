import React from 'react';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';


function Broadcast({username, spotify}) {
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
            .then(() => setInterval(() => spotify.fetchState().then(d => console.log(d)), 2000))
            .then((data) => {
                spotify.onPlayerStateChanged(data => {
                    if (data.newSong != null) {
                        console.log(data);
                        console.log('username', username)
                        const songEvent = {
                            userID: username,
                            timestamp: Math.floor(Date.now() / 100),
                            position: 0,
                            spotifyURI: data.newSong.uri,
                        };
                        console.log(songEvent);
                        API.graphql(graphqlOperation(mutations.createSongEvent, {input: songEvent})).then(data => console.log(data));
                    }
                });
            });
        }
    }, [spotify, username]);

    if (username == null) {
        return <div>Login to spotify to set the eardrum monster free</div>
    }

    if (spotify) {
        return (
            <div>broadcasting los master PLUS. </div>
        );
    }
    return <div>Initializing spotify web player...</div>;
}

export default Broadcast;
