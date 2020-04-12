export default class SpotifyClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.freshAccessToken = true;
    this.player = null;
  }

  /**
   * Fetches the current Spotify status.
   * Resolves instantly with default params. (No long polling)
   * @params - Query params that can add/overwrite default params.
   * @returns { Promise } - Spotify status
   */
  fetchState() {
    if (!this.player) {
      console.error('Player not initialized');
      return Promise.reject('player not initialized');
    }

    return this.player.getCurrentState();
  }

  // TODO Mejorar esta funcion
  /**
   * Handles a new state by pausing/playing/seeking depending on current status
   * @param state
   */
  handleNewState(state) {
    const newUri = state.spotifyURI;

    if (this.player) {
      // We're using the web player
      this.fetchState().then(currentState => {
        const currentUri = SpotifyClient.getUriFromState(currentState);
        if (currentUri === newUri) {
          if (Math.abs(state.position - currentState.position) > 10000) {
            this.seek(state.position);
          }
          return;
        }
        this.play(newUri);
      });
    } else {
      // We arent using the web player
      this.play(newUri);
    }
  }

  /**
   * Pause Spotify client
   * @returns { Promise } - Spotify Status
   */
  pause() {
    return this.player.pause();
  }

  seek(ms) {
    return this.player.seek(ms);
  }

  /**
   * Play a song given a uri and seek to seconds (optional)
   * We have to call pause() initially because calling play with the same song errors out
   * @param uri - Track uri
   * @param seconds - Seconds where the player should seek to
   * @returns { Promise } - Spotify Status
   */
  play(uri) {
    return fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    ).then(response => {
      if (!response.ok) {
        console.error('error playing uri');
      }
      // DISPATCH HERE
    //   return store.dispatch(
    //     `channel/${channelActionTypes.SET_IS_PLAYING}`,
    //     true,
    //   );
    });
  }

  /**
   * Sets polling query params and calls fetchStatus
   * This is a long polling implementation with Spotify's client which
   * resolves when play/pause/seek or after 60 seconds
   */
  onPlayerStateChanged(callback) {
    this.player.addListener('player_state_changed', state => {
      let newSong = SpotifyClient.getTrackFromState(state);
      const newSongUri = SpotifyClient.getUriFromState(state);

      if (newSongUri === this.currentSongUri) {
        newSong = null;
      }

      this.currentSongUri = newSongUri;

      callback({
        newState: state,
        newSong,
      });
    });
  }

  prepareSpotifyClient() {
    return new Promise(resolve => {
        if (this.player) {
            resolve();
            return;
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            this.initializePlayer().then(resolve);
        };

        const sdkScript = document.createElement('script');
        sdkScript.src = 'https://sdk.scdn.co/spotify-player.js';
        document.body.appendChild(sdkScript);
    });
  }

  initializePlayer() {
    return new Promise(resolve => {
      this.player = new window.Spotify.Player({
        name: 'eardrum.monster',
        getOAuthToken: this.fetchOauthToken.bind(this),
        volume: 0.1,
      });

      this.player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
      });
      this.player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
      });
      this.player.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
      });
      this.player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message);
      });
      this.player.on('ready', ({ device_id: id }) => {
        // Transfer playback to web player
        this.deviceId = id;
        fetch('https://api.spotify.com/v1/me/player', {
          method: 'PUT',
          body: JSON.stringify({ device_ids: [this.deviceId], play: true }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
        }).then(response => {
          if (response.ok) {
            resolve();
          } else {
            console.error('unable to transfer playback to web player');
          }
        });
      });

      this.player.connect().then(success => {
        if (!success) {
          console.error('Failed to connect to the web player');
        }
      });
    });
  }

  /**
   * Fetch and set Spotify's Oauth token needed to authenticate requests
   * @returns {Promise.<*>}
   * @private
   */
  fetchOauthToken(callback) {
    if (this.freshAccessToken) {
      callback(this.accessToken);
    } else {
      // TODO: Fetch a new access token from the server
      console.error('fetchOauthToken called more than once');
      callback(this.accessToken);
    }
  }

  static getTrackFromState(state) {
    if (state && state.track_window && state.track_window.current_track) {
      return state.track_window.current_track;
    }

    return null;
  }

  static getUriFromState(state) {
    if (state && state.track_window && state.track_window.current_track) {
      return state.track_window.current_track.uri;
    }

    return null;
  }

  /**
   * Returns if a given status is an Ad
   * @param state
   * @returns { boolean } - true if the track is an ad, false otherwise
   */
  static isAd(state) {
    if (state && state.track_window && state.track_window.current_track) {
      return state.track_window.current_track.type === 'ad';
    }

    return false;
  }

  fetchCurrentDeviceId() {
    return fetch('https://api.spotify.com/v1/me/player', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then(response => {
      if (!response.ok) {
        console.error('error fetching device id');
      }
      if (response.body.device && response.body.device.id) {
          console.log('fetched device ID');
        return response.body.device.id;
      }

      return null;
    });
  }

  fetchUserInfo() {
    return fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    }).then(response => {
      if (!response.ok) {
          throw(response);
      }
      return response.json();
    });
  }

  setDeviceId(id) {
    this.deviceId = id;
  }
}
