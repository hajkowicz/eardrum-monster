import React from "react";
import { Connect } from "aws-amplify-react";
import * as subscriptions from "./graphql/subscriptions";
import * as queries from "./graphql/queries";
import { graphqlOperation } from "aws-amplify";
import { getActiveListeners, isUserListening } from "./Utils";
import "./Listeners.css";

import type {
  OnUpdateUserByListeningToSubscription,
  UsersByListeningToQuery,
} from "./API";
import type { User } from "./Types";

export default function Listeners({
  hostUserID,
  hostDisplayName,
  hostUserImg,
}: {
  hostUserID: string;
  hostDisplayName: string;
  hostUserImg: string;
}) {
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
    <div className="Listeners EMContainer">
      <div className="Listeners-title">Listeners</div>
      <div className="Listeners-list">
        <Connect
          query={graphqlOperation(queries.usersByListeningTo, {
            listeningTo: hostUserID,
            sortDirection: "DESC",
            limit: 50,
          })}
          subscription={graphqlOperation(
            subscriptions.onUpdateUserByListeningTo,
            {
              listeningTo: hostUserID,
            }
          )}
          // @ts-ignore
          onSubscriptionMsg={(
            prev: UsersByListeningToQuery,
            data: OnUpdateUserByListeningToSubscription
          ) => {
            const { onUpdateUserByListeningTo } = data;
            const items = prev.usersByListeningTo?.items;
            if (items == null || onUpdateUserByListeningTo == null) {
              console.error("unexpected null Listeners", prev);
              return prev;
            }
            const index = items.findIndex(
              (user) => user && user.userID === onUpdateUserByListeningTo.userID
            );
            const isListening = isUserListening(onUpdateUserByListeningTo);
            let wasListening = isUserListening(items[index] as User);
            if (index >= 0) {
              items[index] = onUpdateUserByListeningTo;
            } else {
              items.push(onUpdateUserByListeningTo);
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
                <div className="Listeners-item">
                  {hostUserImg && (
                    <img
                      className="Listeners-userImg"
                      src={hostUserImg}
                      alt={`Profile Pic`}
                    />
                  )}
                  {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                  <div>{hostDisplayName} ⭐</div>
                </div>
                {onlineUsers.map((user) => {
                  if (user == null) {
                    return null;
                  }
                  return (
                    <div className="Listeners-item" key={user.userID}>
                      {user?.userImg && (
                        <img
                          className="Listeners-userImg"
                          src={user?.userImg}
                          alt={`Profile Pic`}
                        />
                      )}
                      <span>{user.displayName || user.userID}</span>
                    </div>
                  );
                })}
              </>
            );
          }}
        </Connect>
      </div>
    </div>
  );
}
