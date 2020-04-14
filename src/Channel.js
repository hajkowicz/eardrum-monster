import React from "react";
import { useParams } from "react-router-dom";
import Listen from "./Listen.js";
import Broadcast from "./Broadcast.js";
import { AuthContext } from "./Auth.js";

function Channel() {
  const authInfo = React.useContext(AuthContext);
  const { id } = useParams();

  if (authInfo?.username === id) {
    return <Broadcast />;
  }

  return <Listen hostUsername={id} />;
}

export default Channel;
