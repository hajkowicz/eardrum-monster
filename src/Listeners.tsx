import React from "react";
import { Connect } from "aws-amplify-react";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import { graphqlOperation } from "aws-amplify";
import { getActiveListeners, isUserListening } from "./Utils";
import "./Listeners.css";

import type { OnUpdateUserSubscription, UsersByListeningToQuery } from "./API";
import type { User } from "./Types";

export default function Listeners({ hostID }: { hostID: string }) {
  const [rerender, setRerender] = React.useState(false);

  // Re-render every 10s to update listeners
  React.useEffect(() => {
    const timeoutID = setTimeout(() => {
      setRerender((r) => !r);
    }, 10000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [rerender]);

  return (
    <div className="Listeners">
      <div className="Listeners-title">Listeners</div>
      <div className="Listeners-list">
        <Connect
          query={graphqlOperation(queries.usersByListeningTo, {
            listeningTo: hostID,
            sortDirection: "DESC",
            limit: 50,
          })}
          subscription={graphqlOperation(subscriptions.onUpdateUser, {
            listeningTo: hostID,
          })}
          // @ts-ignore
          onSubscriptionMsg={(
            prev: UsersByListeningToQuery,
            data: OnUpdateUserSubscription
          ) => {
            const { onUpdateUser } = data;
            const items = prev.usersByListeningTo?.items;
            if (items == null || onUpdateUser == null) {
              console.error("unexpected null Listeners", prev);
              return prev;
            }
            const index = items.findIndex(
              (user) => user && user.userID === onUpdateUser.userID
            );
            const isListening = isUserListening(onUpdateUser);
            let wasListening = isUserListening(items[index] as User);
            if (index >= 0) {
              items[index] = onUpdateUser;
            } else {
              items.push(onUpdateUser);
            }
            if (isListening && !wasListening) {
              const audio = new Audio(process.env.PUBLIC_URL + "/notif.wav");
              audio.volume = 0.2;
              audio.play();
            }
            return prev;
          }}
        >
          {({ data, loading, error }: any) => {
            if (error) return <h3>Error</h3>;
            if (loading || !data) return <h3>Loading...</h3>;
            const users =
              (data.usersByListeningTo && data.usersByListeningTo.items) ?? [];
            const onlineUsers = getActiveListeners(users);
            return (
              <>
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <div>{hostID} ⭐</div>
                {onlineUsers.map((user) => {
                  if (user == null) {
                    return null;
                  }
                  return <div key={user.userID}>{user.userID}</div>;
                })}
              </>
            );
          }}
        </Connect>
      </div>
    </div>
  );
}