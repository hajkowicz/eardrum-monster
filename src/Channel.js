import React from 'react';
import {
  useParams
} from "react-router-dom";
import Listen from './Listen.js';
import Broadcast from './Broadcast.js';

function Channel({username, spotify}) {
  const { id } = useParams();

  if (username === id) {
    return (<Broadcast username={username} spotify={spotify}/>);
  }

  return (<Listen username={username} hostUsername={id} spotify={spotify} />);

}

export default Channel;
