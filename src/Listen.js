import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import Track from "./Track.js";
import "./Listen.css";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import * as mutations from "./graphql/mutations";

const ListView = ({ songs }) => (
  <>
    <h3>Recently played tracks</h3>
    {songs.map((song) => (
      <div key={song.id} className="Listen-track">
        <Track track={song.track} />
      </div>
    ))}
  </>
);

function PlaySong({ song, spotify }) {
  const [deviceID, setDeviceID] = React.useState(null);
  React.useEffect(() => {
    if (spotify) {
      spotify
        .fetchCurrentDeviceId()
        .then((id) => {
          if (id) {
            return spotify.setDeviceId(id);
          }
          return spotify.prepareSpotifyClient();
        })
        .then(() => setDeviceID(spotify.deviceId));
    }
  }, [spotify]);

  React.useEffect(() => {
    spotify && song && deviceID && spotify.handleNewState(song);
  }, [song, deviceID, spotify]);
  return null;
}

function DevPublisher({ hostUsername }) {
  React.useEffect(() => {
    const timeoutID = setInterval(() => {
      const tracks = [
        "spotify:track:08KMh61hPslT7sEf2tEgtT",
        "spotify:track:4mFDsq9pt9msJ9ywYvBzHo",
        "spotify:track:59nNxS2V7M4UDH058BU5qJ",
        "spotify:track:1CkrhTdtRhUzPmA8qtr6y6",
        "spotify:track:4mFDsq9pt9msJ9ywYvBzHo",
        "spotify:track:6AynxUt8LJy9S6bovDdFLr",
        "spotify:track:000PzErbB04ALQCv9iYiQm",
        "spotify:track:6AynxUt8LJy9S6bovDdFLr",
        "spotify:track:7JGepQzDnQDYeGxLCTBSsG",
        "spotify:track:4PPrsYpzuRqe4QoCDGAG4b",
      ];
      const songEvent = {
        userID: hostUsername,
        timestamp: Math.floor(Date.now() / 100),
        position: 0,
        spotifyURI: tracks[(Math.random() * 100).toString()[0]],
      };
      API.graphql(
        graphqlOperation(mutations.createSongEvent, { input: songEvent })
      ).then((data) => console.log("Publishing: ", data));
    }, 5000);

    return () => {
      clearInterval(timeoutID);
    };
  }, [hostUsername]);
  return <h1>DevPublisher enabled</h1>;
}

function Listen({ username, hostUsername, spotify }) {
  const devPublisherEnabled = window.location.search.includes("DEV=1");
  return (
    <div className="Listen">
      <div className="Listen-header">
        {username != null ? (
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
            return (
              <>
                <PlaySong song={songs[0]} spotify={spotify} />
                <ListView songs={songs} />
              </>
            );
          }}
        </Connect>
      </div>
    </div>
  );
}

export default Listen;
