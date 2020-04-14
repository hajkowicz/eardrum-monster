import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import "./Listen.css";
import DevPublisher from "./DevPublisher.js";
import { AuthContext } from "./Auth.js";
import SongPlayerWithControls from "./SongPlayerWithControls.js";
import TrackList from "./TrackList.js";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

function Listen({ hostUsername }) {
  const authInfo = React.useContext(AuthContext);
  const devPublisherEnabled = window.location.search.includes("DEV=1");
  return (
    <div className="Listen">
      <div className="Listen-header">
        {authInfo != null ? (
          <div>Listening to {hostUsername}'s channel!</div>
        ) : (
          <div>Login to spotify to set the eardrum monster free</div>
        )}

        {devPublisherEnabled && <DevPublisher hostUsername={hostUsername} />}
      </div>

      <div className="Listen-trackList">
        <Connect
          query={graphqlOperation(queries.songEventsByUserId, {
            userID: hostUsername,
            sortDirection: "DESC",
            limit: 50,
          })}
          subscription={graphqlOperation(subscriptions.onCreateSongEvent, {
            userID: hostUsername,
          })}
          onSubscriptionMsg={(prev, { onCreateSongEvent }) => {
            prev.songEventsByUserID.items.unshift(onCreateSongEvent);
            if (prev.songEventsByUserID.items.length > 50) {
              prev.songEventsByUserID.items.pop();
            }
            return prev;
          }}
        >
          {({ data, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !data) return <h3>Loading...</h3>;
            const songs =
              (data.songEventsByUserID && data.songEventsByUserID.items) ?? [];
            if (songs.length === 0) {
              return <div>No track history available</div>;
            }
            return (
              <>
                {authInfo != null && <SongPlayerWithControls song={songs[0]} />}
                <TrackList songs={songs} />
              </>
            );
          }}
        </Connect>
      </div>
    </div>
  );
}

export default Listen;
