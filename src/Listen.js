import React from 'react';
import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

const ListView = ({ songs }) => (
    <div>
        <h3>Recently played</h3>
        <ul>
            {songs.items.map(song => <li key={song.id}>{song.spotifyURI}</li>)}
        </ul>
    </div>
);

function Listen({username, spotify}) {
  return (
      <>
      <div>Listening to {username}'s channel!</div>

    <Connect
    query={graphqlOperation(queries.listSongEvents, {filter: {userID: {eq: username}} })}
    subscription={graphqlOperation(subscriptions.onCreateSongEvent, {userID: username})}
    onSubscriptionMsg={(prev, { onCreateSongEvent }) => {
        console.log ( 'sub' , prev, onCreateSongEvent);
        prev.listSongEvents.items.unshift(onCreateSongEvent);
        if (prev.listSongEvents.items.length > 50) {
            prev.listSongEvents.items.pop();
        }
        return prev;
    }}
>
    {({ data, loading, error }) => {
        console.log(data);
        if (error) return (<h3>Error</h3>);
        if (loading || !data ) return (<h3>Loading...</h3>);
        return (<ListView songs={data.listSongEvents? data.listSongEvents: []} />);
    }}
 </Connect>
 </>
  );
}

export default Listen;
