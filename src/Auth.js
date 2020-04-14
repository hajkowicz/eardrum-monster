import React, { createContext } from "react";
import { useLocalStorage } from "@rehooks/local-storage";
import SpotifyAPI from "./SpotifyAPI.js";
import { useHistory } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "./graphql/mutations";

export const AuthContext = createContext();

function handleAuthRedirect(setAuthInfo, history) {
  if (window.location.hash) {
    const params = {};
    window.location.hash
      .slice(1)
      .split("&")
      .map((param) => param.split("="))
      .forEach((tup) => {
        params[tup[0]] = tup[1];
      });
    const accessToken = params.access_token;
    window.location.hash = "";

    new SpotifyAPI(accessToken).fetchUserInfo().then((user) => {
      setAuthInfo({ accessToken, username: user.id });
      history.push(decodeURIComponent(params.state));
    });
  }
  return null;
}

export function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("EMAuthInfo");
  const history = useHistory();

  React.useEffect(() => {
    handleAuthRedirect(setAuthInfo, history);
  }, [setAuthInfo, history]);

  // Ensure the user is created uponLogin
  React.useEffect(() => {
    if (authInfo) {
      API.graphql(
        graphqlOperation(mutations.createUser, {
          input: {
            userID: authInfo.username,
          },
        })
      ).catch(() => console.error("user creation failed"));
    }
  }, [authInfo]);

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
