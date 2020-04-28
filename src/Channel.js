import React from "react";
import { useParams } from "react-router-dom";
import Listen from "./Listen.js";
import Broadcast from "./Broadcast.js";
import { AuthContext } from "./Auth.js";

function Channel() {
  const authInfo = React.useContext(AuthContext);
  const { id } = useParams();

  if (authInfo?.displayName === id) {
    return <Broadcast />;
  }

  return <Listen hostDisplayName={id} />;
}

export default Channel;
