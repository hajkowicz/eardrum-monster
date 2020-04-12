import React from 'react';
import './App.css';
import SpotifyClient from './spotify.js';
import Header from './Header.js';
import MaybeUpdateAccessToken from './MaybeUpdateAccessToken.js';
import Channel from './Channel.js';
import Home from './Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const storedToken = window.localStorage.getItem('spotifyAccessToken');
  const storedUsername = window.localStorage.getItem('spotifyUsername');
  const [accessToken, setAccessTokenRaw] = React.useState(storedToken);
  const [username, setUsernameRaw] = React.useState(storedUsername);
  const [spotify, setSpotify] = React.useState(null);

  React.useEffect(() => {
    if (accessToken) {
      const spotifyInst = new SpotifyClient(accessToken);
      console.log(spotifyInst);
      setSpotify(spotifyInst);
      spotifyInst.fetchUserInfo().then(user => {
        setUsername(user.id);
      });
    }
  }, [accessToken]);

  function clearAccessToken() {
    console.log('clearing');
    window.localStorage.removeItem('spotifyAccessToken');
    window.localStorage.removeItem('spotifyUsername');
    setAccessTokenRaw(null);
    setUsernameRaw(null);
  }

  function setAccessToken(accessToken) {
    window.localStorage.setItem('spotifyAccessToken', accessToken);
    setAccessTokenRaw(accessToken);
  }

  function setUsername(username) {
    window.localStorage.setItem('spotifyUsername', username);
    setUsernameRaw(username);
  }

  return (
    <div className="App">
      <Router>
          <MaybeUpdateAccessToken setAccessToken={setAccessToken} />
          <Header clearAccessToken={clearAccessToken} accessToken={accessToken} username={username}/>
          <Switch>
            <Route exact path="/">
              <Home username={username} />
            </Route>
            <Route path="/u/:id">
              <Channel username={username} spotify={spotify} />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
