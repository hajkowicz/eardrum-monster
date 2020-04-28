import React from "react";
import useAuth from "./useAuth";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import { useHistory } from "react-router-dom";

function updateDisplayName(userID: string, displayName: string) {
  return (API.graphql(
    graphqlOperation(queries.usersByDisplayName, {
      displayName,
    })
  ) as Promise<GraphQLResult>)
    .then((data: any) => {
      const user = data?.data?.usersByDisplayName?.items?.[0];
      if (user != null) {
        throw new Error("Username exists");
      }
    })
    .then(() => {
      return API.graphql(
        graphqlOperation(mutations.updateUser, {
          input: {
            userID,
            displayName,
          },
        })
      ) as Promise<GraphQLResult>;
    }) as Promise<GraphQLResult>;
}

export default function RedirectToLoginOrBroadcast() {
  const [val, setVal] = React.useState("");
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const authInfo = useAuth();
  const history = useHistory();

  const handleUpdate = (e: any) => {
    setVal(e.target.value);
  };

  const updateName = (event: any) => {
    if (authInfo == null) {
      return;
    }
    event.preventDefault();
    updateDisplayName(authInfo.username, val)
      .then(() => {
        setSuccess(true);
        authInfo.setAuthInfo({ ...authInfo, displayName: val });
        history.replace(`/u/${val}`);
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <div className="App-container">
      <form onSubmit={updateName}>
        <label>New Username:</label>
        <input value={val} onChange={handleUpdate} />
        <input type="submit" value="Submit" />
      </form>
      {success === null ? null : success === false ? "Error" : "Success!"}
    </div>
  );
}
