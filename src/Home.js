import React from "react";
import { Link } from "react-router-dom";

function Home({ username }) {
  return (
    <div>
      <h2>Currently broadcasting:</h2>
      <ul>
        {username != null ? (
          <li>
            <Link className="App-link" to={`/u/${username}`}>
              /u/{username}
            </Link>
          </li>
        ) : null}
        <li>
          <Link to="/u/alta">/u/alta</Link>
        </li>
        <li>
          <Link to="/u/hajkowicz">/u/hajkowicz</Link>
        </li>
        <li>
          <Link to="/u/cilo">/u/cilo</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
