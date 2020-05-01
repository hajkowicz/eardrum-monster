import React from "react";
import { AuthContext } from "./Auth";

export type AuthInfo = {
  username: string;
  accessToken: string;
  userImg: string | null;
  displayName: string | null;
  retryAuth: () => void;
  setAuthInfo: (authInfo: AuthInfo) => void;
} | null;

export default function useSpotifyAPI(): AuthInfo {
  const authContext = React.useContext(AuthContext);
  return authContext as AuthInfo;
}
