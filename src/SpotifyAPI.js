export default class SpotifyAPI {
  constructor(accessToken, onUnauthorized) {
    if (accessToken == null) {
      throw new Error("Access token was null");
    }
    this.accessToken = accessToken;
    this.onUnauthorized = onUnauthorized ?? (() => {});
    this.maybeHandle401 = this.maybeHandle401.bind(this);
  }

  maybeHandle401(response) {
    if (response.status === 401) {
      this.onUnauthorized();
      throw new Error("Unauthorized: ", response);
    }
    return response;
  }

  fetchUserInfo() {
    return fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(this.maybeHandle401)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      });
  }

  fetchCurrentDeviceID() {
    return fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(this.maybeHandle401)
      .then((response) => {
        if (!response.ok) {
          console.error("error fetching device id");
        }
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data?.device?.id) {
          return data.device.id;
        }
        return null;
      });
  }

  play(uri, deviceID) {
    const query = deviceID != null ? `?device_id=${deviceID}` : "";
    return fetch(`https://api.spotify.com/v1/me/player/play/${query}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(this.maybeHandle401)
      .then((response) => {
        if (!response.ok) {
          console.error("Error playing uri", response);
        }
      });
  }

  transferPlayback(deviceID) {
    return fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      body: JSON.stringify({ device_ids: [deviceID], play: true }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(this.maybeHandle401)
      .then((response) => {
        if (!response.ok) {
          throw new Error("unable to transfer playback to device: " + deviceID);
        }
      });
  }

  fetchDevices() {
    return fetch("https://api.spotify.com/v1/me/player/devices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
      .then(this.maybeHandle401)
      .then((response) => {
        if (!response.ok) {
          throw new Error("unable to fetch devices");
        }
        return response.json();
      });
  }
}
