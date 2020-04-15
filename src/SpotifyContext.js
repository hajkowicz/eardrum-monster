import React, { createContext } from "react";
import SpotifyAPI from "./SpotifyAPI.js";
import SpotifyWebPlayer from "./SpotifyWebPlayer.js";
import { AuthContext } from "./Auth.js";

export const SpotifyContext = createContext();

export function SpotifyProvider({ children }) {
  const authInfo = React.useContext(AuthContext);
  const [webPlayer, setWebPlayer] = React.useState(null);
  const [spotifyAPI, setSpotifyAPI] = React.useState(null);

  React.useEffect(() => {
    if (authInfo == null) {
      setWebPlayer(null);
      setSpotifyAPI(null);
    } else {
      const api = new SpotifyAPI(authInfo.accessToken, authInfo.logout);
      setSpotifyAPI(api);
      SpotifyWebPlayer.createInstance(
        authInfo.accessToken,
        api,
        authInfo.retryAuth
      ).then((inst) => {
        setWebPlayer(inst);
      });
    }
  }, [authInfo]);

  const spotifyContext = React.useMemo(
    () => ({
      webPlayer,
      spotifyAPI,
    }),
    [webPlayer, spotifyAPI]
  );

  return (
    <SpotifyContext.Provider value={spotifyContext}>
      {children}
    </SpotifyContext.Provider>
  );
}
