import React from "react";
import { useParams } from "react-router-dom";
import Listen from "./Listen.js";
import Broadcast from "./Broadcast.js";
import { AuthContext } from "./Auth.js";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";

function fetchHostByDisplayName(hostDisplayName) {
  return API.graphql(
    graphqlOperation(queries.usersByDisplayName, {
      displayName: hostDisplayName,
      sortDirection: "DESC",
      limit: 1,
    })
  ).then((data) => {
    return data?.data?.usersByDisplayName?.items?.[0];
  });
}

function Channel() {
  const authInfo = React.useContext(AuthContext);
  const { id } = useParams();
  const [hostUserID, setHostUserID] = React.useState(null);
  const [hostUserImg, setHostUserImg] = React.useState(null);
  const [failedLookup, setFailedLookup] = React.useState(false);
  const hostDisplayName = id;

  //Resolve host username
  React.useEffect(() => {
    if (authInfo != null && authInfo.displayName === hostDisplayName) {
      setHostUserID(authInfo?.displayName);
      return;
    }

    fetchHostByDisplayName(hostDisplayName)
      .then((host) => {
        if (host?.userID == null) {
          throw new Error("Could not locate user");
        }
        setHostUserID(host.userID);
        setHostUserImg(host?.userImg);
      })
      .catch(() => {
        setFailedLookup(true);
      });
  }, [authInfo, id, hostDisplayName]);

  if (failedLookup) {
    return <div className="Listen">User not found</div>;
  }

  if (hostUserID == null) {
    return null;
  }

  if (authInfo?.displayName === hostDisplayName) {
    return <Broadcast />;
  }

  return (
    <Listen
      hostDisplayName={hostDisplayName}
      hostUserID={hostUserID}
      hostUserImg={hostUserImg}
    />
  );
}

export default Channel;
