import React from "react";
import { AuthContext } from "./Auth";

export type AuthInfo = { username: string; accessToken: string } | null;

export default function useSpotifyAPI(): AuthInfo {
  const authContext = React.useContext(AuthContext);
  return authContext as AuthInfo;
}
