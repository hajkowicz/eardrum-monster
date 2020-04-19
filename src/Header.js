import React from "react";
import logo from "./logo.png";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { AuthContext, getAuthorizeURI } from "./Auth.js";

function Header() {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const authorizeURI = getAuthorizeURI(location.pathname);
  const match = useRouteMatch("/u/" + authInfo?.username);

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
          {match == null ? (
            <Link className="App-link" to={`/u/${authInfo.username}`}>
              Broadcast
            </Link>
          ) : (
            /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
            <a className="App-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
        </>
      ) : (
        <a className="App-link" href={authorizeURI}>
          Login
        </a>
      )}
    </header>
  );
}

export default Header;
