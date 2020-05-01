import React from "react";
import useAuth from "./useAuth";
import { Redirect, useLocation } from "react-router-dom";
import { getAuthorizeURI } from "./Auth";

export default function RedirectToLoginOrBroadcast() {
  const location = useLocation();
  const authInfo = useAuth();
  if (authInfo && typeof authInfo.displayName === "string") {
    return <Redirect to={`/u/${encodeURIComponent(authInfo.displayName)}`} />;
  }
  window.location.href = getAuthorizeURI(location.pathname);
  return null;
}
