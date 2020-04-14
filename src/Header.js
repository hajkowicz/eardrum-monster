import React from "react";
import logo from "./logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth.js";

function Header() {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const scopes = process.env.REACT_APP_SPOTIFY_SCOPES;
  const redirectURI = encodeURIComponent(
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  );
  const currentPath = encodeURIComponent(location.pathname);
  const authorizeURI = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}&state=${currentPath}`;

  function handleLogout(e) {
    e.preventDefault();
    authInfo.logout();
  }

  return (
    <header className="App-header">
      <Link className="App-title" to="/">
        <h1>EARDRUM MONSTER</h1>
      </Link>
      <img src={logo} className="App-logo" alt="logo" />
      {authInfo != null ? (
        <>
          <Link className="App-link" to={`/u/${authInfo.username}`}>
            /u/{authInfo.username}
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="App-link" href="#" onClick={handleLogout}>
            Logout
          </a>
        </>
      ) : (
        <a className="App-link" href={authorizeURI}>
          Login with Spotify
        </a>
      )}
    </header>
  );
}

export default Header;
