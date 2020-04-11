import React from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyClient from './spotify.js';

function App() {
  const clientID = 'd73f9dfa97c44b57ac7cefcc031c4df9';
  const scopes = 'streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing';
  const redirectURI = encodeURIComponent('http://localhost:3000/');
  const authorizeURI = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}`;

  const [accessToken, setAccessToken] = React.useState(null);

  if (window.location.hash) {
    const params = {};
    window.location.hash.slice(1).split('&').map(param => param.split('=')).forEach(tup => { params[tup[0]] = tup[1] });
    const accessToken = params.access_token;
    setAccessToken(accessToken);
    console.log('setaccesstoken');
    window.location.hash = '';
  }

  React.useMemo(() => {
    console.log('inhere');
    console.log(accessToken);
    if (accessToken) {
      console.log('initing');
      const client = new SpotifyClient(accessToken);
      client
        .prepareSpotifyClient()
        .then(() => client.fetchState())
        .then((data) => {
          console.log(data);
          client.play('spotify:track:727LbE4pV6RtLK5FnH1WIe');
        });
    }
  }, [accessToken]); // Only re-run the effect if count changes


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">EARDRUM MONSTER</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <a href={authorizeURI}>Login with Spotify</a>
      </header>
      <div>
        <h2>now playing</h2>
      </div>
    </div>
  );
}

export default App;
