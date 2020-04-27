import React from "react";
import useAuth from "./useAuth";
import { Redirect, useLocation } from "react-router-dom";
import { getAuthorizeURI } from "./Auth";

export default function RedirectToLoginOrBroadcast() {
  const location = useLocation();
  const authInfo = useAuth();
  console.log(authInfo);
  if (authInfo) {
    return <Redirect to={`/u/${authInfo.username}`} />;
  }
  window.location.href = getAuthorizeURI(location.pathname);
  return null;
}
