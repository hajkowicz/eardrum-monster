import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyClient from './spotify.js';

function App() {
  const clientID = 'd73f9dfa97c44b57ac7cefcc031c4df9';
  const scopes = 'streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing';
  const redirectURI = encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI);
  const authorizeURI = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}`;

  const initialToken = window.localStorage.getItem('spotifyAccessToken');
  const [accessToken, setAccessToken] = React.useState(initialToken);

  if (window.location.hash) {
    const params = {};
    window.location.hash.slice(1).split('&').map(param => param.split('=')).forEach(tup => { params[tup[0]] = tup[1] });
    const accessToken = params.access_token;
    window.localStorage.setItem('spotifyAccessToken', accessToken);
    setAccessToken(accessToken);
    window.location.hash = '';
  }

  React.useEffect(() => {
    if (accessToken) {
      initSpotifyClient();
    }
  }, [accessToken]);

  function clearAccessToken(e) {
    e.preventDefault();
    window.localStorage.removeItem('spotifyAccessToken');
    setAccessToken(null);
  }

  function initSpotifyClient() {
      const client = new SpotifyClient(accessToken);
      client
        .prepareSpotifyClient()
        .then(() => client.fetchState())
        .then((data) => {
          client.play('spotify:track:727LbE4pV6RtLK5FnH1WIe');
        });
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">EARDRUM MONSTER</h1>
        <img src={logo} className="App-logo" alt="logo" />
        {accessToken != null ?
          <a className="App-link" href="#" onClick={clearAccessToken} >Logout</a> :
          <a className="App-link" href={authorizeURI}>Login with Spotify</a>
        }
      </header>
      <div>
        <h2>now playing</h2>
      </div>
    </div>
  );
}

export default App;
