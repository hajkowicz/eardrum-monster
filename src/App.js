import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const clientID = 'd73f9dfa97c44b57ac7cefcc031c4df9';
  const scopes = 'streaming+user-read-email+user-read-private+user-read-playback-state+user-modify-playback-state+user-read-currently-playing';
  const redirectURI = encodeURIComponent('http://localhost:3000/');
  const authorizeURI = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURI}`;

  if (window.location.hash) {
    const params = {};
    window.location.hash.slice(1).split('&').map(param => param.split('=')).forEach(tup => { params[tup[0]] = tup[1] });
    const accessToken = params.access_token;
    console.log(accessToken);
    // Save this somewhere
    window.location.hash = '';
  }

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
