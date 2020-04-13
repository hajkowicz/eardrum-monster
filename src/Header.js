import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

function Header({ accessToken, clearAccessToken, username }) {
  const clientID = "d73f9dfa97c44b57ac7cefcc031c4df9";
  const scopes =
    "streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing";
  const redirectURI = encodeURIComponent(
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  );
  const authorizeURI = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}`;

  function handleLogout(e) {
    e.preventDefault();
    clearAccessToken();
  }

  return (
    <header className="App-header">
      <Link className="App-title" to="/">
        <h1>EARDRUM MONSTER</h1>
      </Link>
      <img src={logo} className="App-logo" alt="logo" />
      {accessToken != null ? (
        <>
          <Link className="App-link" to={`/u/${username}`}>
            /u/{username}
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
