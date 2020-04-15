import React from "react";
import { Link } from "react-router-dom";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import "./Home.css";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

const UserList = ({ users }) => (
  <div className="Home-userList">
    {users.map((user) => (
      <Link key={user.userID} className="Home-link" to={`/u/${user.userID}`}>
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        👂 /u/{user.userID}
      </Link>
    ))}
  </div>
);

function Home() {
  return (
    <div className="Home">
      <Connect
        query={graphqlOperation(queries.listUsers, {
          limit: 50,
        })}
        subscription={graphqlOperation(subscriptions.onUpdateUser)}
        onSubscriptionMsg={(prev, { onUserUpdate }) => {
          // TODO update user list here
          return prev;
        }}
      >
        {({ data, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !data) return <h3>Loading...</h3>;
          const users = (data.listUsers && data.listUsers.items) ?? [];
          return (
            <>
              {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
              <h2 className="Home-title">😈 MONSTER LIST 😈</h2>
              <UserList users={users} />
            </>
          );
        }}
      </Connect>
    </div>
  );
}

export default Home;
