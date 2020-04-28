import React from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { AuthContext, getAuthorizeURI } from "./Auth.js";

function Header() {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const authorizeURI = getAuthorizeURI(location.pathname);
  const match = useRouteMatch("/u/" + authInfo?.displayName);

  function handleLogout(e) {
    e.preventDefault();
    authInfo.logout();
  }

  return (
    <header className="App-header">
      <Link className="App-title" to="/">
        <h1>EARDRUM MONSTER</h1>
      </Link>
      {authInfo != null ? (
        <>
          {match == null ? (
            <Link className="App-link" to={`/u/${authInfo.displayName}`}>
              Host a channel
            </Link>
          ) : (
            /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
            <a className="App-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
          <div className="App-headerPhoto">
            <Link className="App-smallLink" to={`/u/${authInfo.displayName}`}>
              {authInfo.displayName}
            </Link>
            {authInfo.userImg ? (
              <img
                className="App-headerImg"
                src={authInfo.userImg}
                alt="profile pic"
              />
            ) : (
              authInfo.displayName
            )}
          </div>
        </>
      ) : (
        <a className="App-link" href={authorizeURI}>
          Host a channel
        </a>
      )}
    </header>
  );
}

export default Header;
