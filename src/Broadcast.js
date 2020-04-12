import React from 'react';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from './graphql/mutations';

const songEvent = {
    userID: 'alta',
    timestamp: 0,
    position: 0,
    spotifyURI: 'spotify:track:727LbE4pV6RtLK5FnH1WIe',
};

function Broadcast({username, spotify}) {
    React.useEffect(() => {
        if(spotify) {

        spotify.prepareSpotifyClient()
        .then(() => spotify.fetchState())
        .then((data) => {
            console.log('fetched state', data);
            // spotify.play('spotify:track:727LbE4pV6RtLK5FnH1WIe');
            API.graphql(graphqlOperation(mutations.createSongEvent, {input: songEvent})).then(data => console.log(data));
        });
        }

    }, [spotify]);
    console.log(spotify);
    if (spotify) {
        return (
            <div>broadcasting los master PLUS. </div>
        );
    }
    return <div>Connecting to spotify</div>;
}

export default Broadcast;
