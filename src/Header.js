import React from "react";
import { Link, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { AuthContext, getAuthorizeURI } from "./Auth.js";
import ChangeUsername from "./ChangeUsername";

function Header() {
  const authInfo = React.useContext(AuthContext);
  const location = useLocation();
  const authorizeURI = getAuthorizeURI("/broadcast");
  const broadcastMatch = useRouteMatch("/u/" + authInfo?.displayName);
  const [editing, setEditing] = React.useState(false);
  const match = useRouteMatch("/u/:id");
  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    authInfo.logout();
  }
  const updateName = (name) => {
    setEditing(false);
    if (
      match?.params &&
      authInfo.displayName &&
      decodeURIComponent(match.params.id).includes(authInfo.displayName)
    ) {
      history.replace(`/u/${encodeURIComponent(name)}`);
    }
  };

  return (
    <header className="App-header">
      <Link className="App-title" to="/">
        <h1>EARDRUM MONSTER</h1>
      </Link>
      {authInfo != null ? (
        <>
          {broadcastMatch == null ? (
            <Link
              className="App-link"
              to={`/u/${encodeURIComponent(authInfo.displayName)}`}
            >
              Host a channel
            </Link>
          ) : (
            /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
            <a className="App-link" href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
          <div className="App-headerPhoto">
            {editing ? (
              <ChangeUsername
                initialVal={authInfo.displayName}
                onSuccess={(name) => updateName(name)}
                onCancel={() => setEditing(false)}
              />
            ) : (
              <span className="App-smallLink">
                {authInfo.displayName}{" "}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className="App-smallLink"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(true);
                  }}
                >
                  edit
                </a>
              </span>
            )}
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
