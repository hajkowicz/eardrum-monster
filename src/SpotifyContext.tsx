import React, { createContext } from "react";
import SpotifyAPI from "./SpotifyAPI.js";
import SpotifyWebPlayer from "./SpotifyWebPlayer.js";
import useAuth from "./useAuth";
import { useHistory } from "react-router-dom";

type SpotifyContextType = {
  webPlayer: SpotifyWebPlayer | null;
  webPlayerUnsupported: boolean;
  spotifyAPI: SpotifyAPI | null;
  lastMutationTimestamp: number | null;
  setLastMutationTimestamp: (time: number) => void;
};

export const SpotifyContext = createContext<SpotifyContextType>({
  webPlayer: null,
  webPlayerUnsupported: false,
  spotifyAPI: null,
  lastMutationTimestamp: null,
  setLastMutationTimestamp: () => {},
});

export function SpotifyProvider({
  children,
}: {
  children: React.ReactChildren;
}) {
  const authInfo = useAuth();
  const history = useHistory();
  const [webPlayer, setWebPlayer] = React.useState<null | SpotifyWebPlayer>(
    null
  );
  const [webPlayerUnsupported, setWebPlayerUnsupported] = React.useState(false);
  const [spotifyAPI, setSpotifyAPI] = React.useState<null | SpotifyAPI>(null);
  const [lastMutationTimestamp, setLastMutationTimestamp] = React.useState<
    null | number
  >(null);

  React.useEffect(() => {
    if (authInfo == null) {
      setWebPlayer(null);
      setSpotifyAPI(null);
    } else {
      const api = new SpotifyAPI(authInfo.accessToken, authInfo.retryAuth);
      setSpotifyAPI(api);
      SpotifyWebPlayer.createInstance(
        authInfo.accessToken,
        api,
        authInfo.retryAuth
      )
        .then((inst) => {
          setWebPlayer(inst);
        })
        .catch((error) => {
          switch (error) {
            case "premium_required": {
              history.replace("/premium_required");
              break;
            }
            case "initialization_error":
            case "playback_error":
            default: {
              setWebPlayer(null);
              setWebPlayerUnsupported(true);
            }
          }
        });
    }
  }, [authInfo, history]);

  const spotifyContext = React.useMemo(
    () => ({
      webPlayer,
      webPlayerUnsupported,
      spotifyAPI,
      lastMutationTimestamp,
      setLastMutationTimestamp,
    }),
    [webPlayer, spotifyAPI, lastMutationTimestamp, webPlayerUnsupported]
  );

  return (
    <SpotifyContext.Provider value={spotifyContext}>
      {children}
    </SpotifyContext.Provider>
  );
}
