import React from 'react';
import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

const ListView = ({ songs }) => (
    <div>
        <h3>Recently played</h3>
        <ul>
            {songs.map(song => <li key={song.id}>{song.spotifyURI}</li>)}
        </ul>
    </div>
);

function PlaySong({song, spotify}) {
    const [deviceID, setDeviceID] = React.useState(null);
    React.useEffect(() => {
      if (spotify) {
        spotify
        .fetchCurrentDeviceId()
        .then(id => {
          if (id) {
            return spotify.setDeviceId(id);
          }
          return spotify.prepareSpotifyClient();
        })
        .then(() => setDeviceID(spotify.deviceId));
      }
    }, [spotify])

    React.useEffect(() => {
        spotify && song && deviceID && spotify.handleNewState(song);
    }, [song, deviceID, spotify]);
    return null;
}

function Listen({username, hostUsername, spotify}) {
  return (
      <>
      {username != null ?
      (<div>Listening to {hostUsername}'s channel!</div>) :
      (<div>Login to spotify to set the eardrum monster free</div>)
      }

    <Connect
    query={graphqlOperation(queries.listSongEvents, {filter: {userID: {eq: hostUsername}} })}
    subscription={graphqlOperation(subscriptions.onCreateSongEvent, {userID: hostUsername})}
    onSubscriptionMsg={(prev, { onCreateSongEvent }) => {
        prev.listSongEvents.items.unshift(onCreateSongEvent);
        if (prev.listSongEvents.items.length > 50) {
            prev.listSongEvents.items.pop();
        }
        return prev;
    }}
>
    {({ data, loading, error }) => {
        if (error) return (<h3>Error</h3>);
        if (loading || !data ) return (<h3>Loading...</h3>);
        const songs = (data.listSongEvents && data.listSongEvents.items) ?? [];
        return (
            <>
                <PlaySong song={songs[0]} spotify={spotify} />
                <ListView songs={songs} />
            </>
        );
    }}
 </Connect>
 </>
  );
}

export default Listen;
