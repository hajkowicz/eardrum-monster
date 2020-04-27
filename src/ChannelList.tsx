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

import type { User } from "./Types";

function Channel({
  img,
  cta,
  title,
  subtitle,
}: {
  img: string | null;
  title: string;
  subtitle: string;
  cta: React.ReactNode;
}) {
  return (
    <div className="Home-user">
      <div className="Home-userTitle">{title}</div>
      <div className="Home-userSubtitle">{subtitle}</div>
      <img className="Home-userImg" src={img ?? logo} alt="Album art" />
      {cta}
    </div>
  );
}

export default function ChannelList() {
  return (
    <div className="ChannelList">
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
        {({ data, loading, error }: any) => {
          if (error) return <h3>Error</h3>;
          if (loading || !data) return <h3>Loading...</h3>;
          const users =
            (data.usersByLatestSongEvent &&
              data.usersByLatestSongEvent.items) ??
            [];
          const onlineUsers = users
            .filter((user: User) => isUserOnline(user))
            .sort((a: User, b: User) =>
              getListenerCount(a) > getListenerCount(b) ? -1 : 1
            );
          return (
            <div className="Home-userList">
              {onlineUsers.map((user: User) => {
                if (user == null) {
                  return null;
                }
                const latestSong = user.songEvents?.items?.[0];
                const img = latestSong?.track?.albumImg ?? null;
                const numListeners = getListenerCount(user);
                return (
                  <Channel
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
              <Channel
                img={null}
                title="Start a channel"
                subtitle=""
                cta={
                  <Link className="Home-link" to={`/broadcast`}>
                    My channel
                  </Link>
                }
              />
            </div>
          );
        }}
      </Connect>
    </div>
  );
}
