import React from 'react';
import {API, graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';
import * as mutations from './graphql/mutations';

        const ListView = ({ todos }) => (
            <div>
                <h3>All Todos</h3>
                <ul>
                    {todos.items.map(todo => <li key={todo.id}>{todo.name} ({todo.id})</li>)}
                </ul>
            </div>
        );
function Listen({channelID, spotify}) {
    React.useEffect(() => {
        setInterval(() => {
API.graphql(graphqlOperation(mutations.createSongEvent, {input: {
    userID:"alta",
    spotifyURI:"abc",
    position: Math.floor(Math.random() * 100),
    timestamp:0,
  }})).then(data => console.log(data));
        }, 2000);
    }, [channelID]);


  return (
      <>
      <div>Listening to {channelID}'s channel!</div>

    <Connect
    query={graphqlOperation(queries.listSongEvents, {filter: {userID: {eq: "alta"}} })}
    subscription={graphqlOperation(subscriptions.onCreateSongEvent, {userID: "alta"})}
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
        if (error) return (<h3>Error</h3>);
        if (loading || !data ) return (<h3>Loading...</h3>);
        return (<ListView todos={data.listSongEvents? data.listSongEvents: []} />);
    }}
 </Connect>
 </>
  );
}

export default Listen;
