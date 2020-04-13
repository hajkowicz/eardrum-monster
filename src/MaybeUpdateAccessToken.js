import React from "react";

function MaybeUpdateAccessToken({ setAccessToken }) {
  React.useEffect(() => {
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
      setAccessToken(accessToken);
    }
  });
  return null;
}

export default MaybeUpdateAccessToken;
