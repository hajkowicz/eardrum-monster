export default class SpotifyWebPlayer {
  constructor(player, spotifyAPI) {
    this.player = player;
    this.spotifyAPI = spotifyAPI;
  }

  fetchState() {
    return this.player.getCurrentState();
  }

  pause() {
    return this.player.pause();
  }

  resume() {
    return this.player.resume();
  }

  seek(ms) {
    return this.player.seek(ms);
  }

  nextTrack() {
    return this.player.nextTrack();
  }

  addStateChangeListener(callback) {
    this.player.addListener("player_state_changed", callback);
  }

  removeStateChangeListener(callback) {
    this.player.removeListener("player_state_changed", callback);
  }

  getDeviceID() {
    return this.player.deviceID;
  }

  transferPlayback() {
    return this.spotifyAPI.transferPlayback(this.player.deviceID);
  }

  static inject() {
    return new Promise((resolve) => {
      if (window?.Spotify?.Player) {
        resolve();
        return;
      }
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve();
      };
      const sdkScript = document.createElement("script");
      sdkScript.src = process.env.REACT_APP_SPOTIFY_WEB_PLAYER_SDK;
      document.body.appendChild(sdkScript);
    });
  }

  static initializePlayer(spotifyAPI, accessToken, onUnauthorized) {
    // Update accessToken singleton so existing players can access it;
    SpotifyWebPlayer.__accessToken = accessToken;
    SpotifyWebPlayer.__onUnauthorized = onUnauthorized;
    SpotifyWebPlayer.__spotifyAPI = spotifyAPI;

    return new Promise((resolve, reject) => {
      if (window.EMglobalPlayerInstance) {
        resolve(window.EMGlobalPlayerInstance);
        return;
      }

      let volumeRef = {
        current:
          window.localStorage.getItem("EMPlayerVolume") ?? (0.1).toFixed(2),
      };
      const player = new window.Spotify.Player({
        name: "eardrum.monster",
        getOAuthToken: (cb) => {
          cb(SpotifyWebPlayer.__accessToken);
          SpotifyWebPlayer.__spotifyAPI.fetchUserInfo();
        },
        volume: volumeRef.current,
      });

      // Update volume on change
      setInterval(() => {
        player.getVolume().then((newVolume) => {
          if (typeof newVolume === "number") {
            const newVol = newVolume.toFixed(2);
            if (newVol > 0 && volumeRef.current !== newVol) {
              volumeRef.current = newVol;
              window.localStorage.setItem("EMPlayerVolume", newVol);
            }
          }
        });
      }, 5000);

      player.on("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
        reject("initialization_error");
      });
      player.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
        SpotifyWebPlayer.__onUnauthorized();
      });
      player.on("account_error", ({ message }) => {
        console.error("Spotify premium required", message);
        reject("premium_required");
      });
      player.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
        reject("playback_error");
      });
      player.on("ready", ({ device_id: id }) => {
        player.deviceID = id;
        window.EMGlobalPlayerInstance = player;
        resolve(player);
      });

      player
        .connect()
        .then((success) => {
          if (!success) {
            console.error("Failed to connect to the web player");
          }
        })
        .catch(() => {
          reject();
        });
    });
  }

  static createInstance(accessToken, spotifyAPI, onUnauthorized) {
    return SpotifyWebPlayer.inject()
      .then(() =>
        SpotifyWebPlayer.initializePlayer(
          spotifyAPI,
          accessToken,
          onUnauthorized
        )
      )
      .then((player) => new SpotifyWebPlayer(player, spotifyAPI));
  }

  static getTrackFromState(state) {
    return state?.track_window?.current_track;
  }
}
