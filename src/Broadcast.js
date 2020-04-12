import React from 'react';

function Broadcast({username, spotify}) {
    React.useEffect(() => {
        if(spotify) {

        spotify.prepareSpotifyClient()
        .then(() => spotify.fetchState())
        .then((data) => {
            console.log('fetched state', data);
            spotify.play('spotify:track:727LbE4pV6RtLK5FnH1WIe');
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
