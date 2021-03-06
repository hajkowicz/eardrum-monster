import React from "react";
import useAuth from "./useAuth";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import "./ChangeUsername.css";

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

export default function ChangeUsername({
  initialVal,
  className,
  onSuccess,
  onCancel,
}: {
  initialVal: string;
  className?: string;
  onSuccess: (name: string) => void;
  onCancel: () => void;
}) {
  const [val, setVal] = React.useState<string>(initialVal);
  const [success, setSuccess] = React.useState<boolean | null>(null);
  const authInfo = useAuth();

  const handleUpdate = (e: any) => {
    setVal(e.target.value);
  };

  const updateName = (event: any) => {
    if (authInfo == null) {
      return;
    }
    event.preventDefault();
    const value = String(val).trim();
    updateDisplayName(authInfo.username, value)
      .then(() => {
        setSuccess(true);
        onSuccess(value);
        authInfo.setAuthInfo({ ...authInfo, displayName: value });
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  return (
    <div className={className}>
      <form onSubmit={updateName}>
        <label className="ChangeUsername-label">New name: </label>
        <input value={val} onChange={handleUpdate} />
        <div>
          <input type="submit" value="Submit" />
          <button type="button" onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </form>
      {success === null ? null : success === false ? "Error" : "Success!"}
    </div>
  );
}
