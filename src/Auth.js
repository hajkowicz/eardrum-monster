import React, { createContext } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import SpotifyAPI from "./SpotifyAPI.js";
import { useHistory, useLocation } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

export const AuthContext = createContext();

export function AuthRedirect() {
  return null;
}

export function getAuthorizeURI(pathname) {
  const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const scopes = process.env.REACT_APP_SPOTIFY_SCOPES;
  const redirectURI = encodeURIComponent(
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  );
  const currentPath = encodeURIComponent(pathname);
  return `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}&state=${currentPath}`;
}

function handleAuthRedirect(setAuthInfo, history, location) {
  if (location.hash) {
    const params = {};
    location.hash
      .slice(1)
      .split("&")
      .map((param) => param.split("="))
      .forEach((tup) => {
        params[tup[0]] = tup[1];
      });
    const accessToken = params.access_token;
    if (accessToken == null) {
      return;
    }
    location.hash = "";
    new SpotifyAPI(accessToken).fetchUserInfo().then((user) => {
      setAuthInfo({ accessToken, username: user.id });
      history.push(decodeURIComponent(params.state));
      // Ensure the user is created upon login
      API.graphql(
        graphqlOperation(mutations.createUser, {
          input: {
            userID: user.id,
          },
        })
      ).catch(() => console.error("user creation failed"));
    });
  }
  return null;
}

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("EMAuthInfo");
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    handleAuthRedirect(setAuthInfo, history, location);
  }, [setAuthInfo, history, location]);

  const authContext = React.useMemo(() => {
    return authInfo != null
      ? {
          accessToken: authInfo.accessToken,
          username: authInfo.username,
          logout: () => setAuthInfo(null),
        }
      : null;
  }, [authInfo, setAuthInfo]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
