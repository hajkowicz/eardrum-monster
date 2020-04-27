import React from "react";
import { Link } from "react-router-dom";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import "./Home.css";
// import { AuthContext } from "./Auth.js";
import * as queries from "./graphql/customQueries";
// import EQBars from "./EQBars.js";
// import useAuth from "./useAuth";
import logo from "./logo.png";
import { isUserOnline, getListenerCount } from "./Utils";

function User({ img, cta, title, subtitle }) {
  return (
    <div className="Home-user">
      <div className="Home-userTitle">{title}</div>
      <div className="Home-userSubtitle">{subtitle}</div>
      <img className="Home-userImg" src={img ?? logo} alt="Album art" />
      {cta}
    </div>
  );
}

const UserList = ({ users }) => (
  <div className="Home-userList">
    {users.map((user) => {
      const img = user.songEvents?.items[0]?.track?.albumImg;
      const numListeners = getListenerCount(user);
      return (
        <User
          key={user.userID}
          img={img}
          title={user.userID}
          subtitle={`${numListeners} ${
            numListeners === 1 ? "listener" : "listeners"
          }`}
          cta={
            <Link
              key={user.userID}
              className="Home-link"
              to={`/u/${user.userID}`}
            >
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              Join ▶️
            </Link>
          }
        />
      );
    })}
    <User
      img={null}
      title="Start a channel"
      cta={
        <Link className="Home-link" to={`/broadcast`}>
          My channel
        </Link>
      }
    />
  </div>
);

function Home() {
  /* eslint-disable jsx-a11y/accessible-emoji */
  return (
    <div className="Home">
      <div>
        <em>
          eardrum.monster allows you to sync your spotify client with friends
        </em>
      </div>
      <div className="Home-list">
        <h2 className="Home-title">
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          😈 Users currently streaming 😈
        </h2>
        <Connect
          query={graphqlOperation(queries.usersByLatestSongEventCustom, {
            type: "USER",
            sortDirection: "DESC",
            limit: 50,
          })}
        >
          {({ data, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !data) return <h3>Loading...</h3>;
            const users =
              (data.usersByLatestSongEvent &&
                data.usersByLatestSongEvent.items) ??
              [];
            const onlineUsers = users
              .filter((user) => isUserOnline(user))
              .sort((a, b) =>
                getListenerCount(a) > getListenerCount(b) ? -1 : 1
              );
            return <UserList users={onlineUsers} />;
          }}
        </Connect>
      </div>
      <div className="Home-content">
        <h1>How do I use it?</h1>
        <div>1. Join a channel or create your own ☝️</div>
        <div>2. Share the URL with your friends️</div>
        <h1>Its great for:</h1>
        <div>
          ✅ Streamers who want to let their viewers sync up their music with
          high quality spotify audio
        </div>
        <div>✅ Online gamers who want listen together while gaming</div>
        <div>
          ✅ People who are quarantined and want to have virtual power hours
          together
        </div>

        <h1>Did you say power hour?</h1>
        <div>
          ✅ Yes! eardrum.monster now features <em>Power hour mode™️</em> that
          will automatically change the song every 60s. Everybody must drink
          when the song changes.
        </div>

        <h1>Can I play century club?</h1>
        <div>
          ✅ We've got you covered! <em>Power hour mode™️</em> will keep em'
          coming well beyond the traditional 60 minutes so you can attempt to
          join the century club as many times as you want!
        </div>
      </div>
    </div>
  );
}

export default Home;
