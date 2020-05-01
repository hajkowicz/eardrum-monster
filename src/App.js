import React from "react";
import "./App.css";
import Header from "./Header.js";
import Channel from "./Channel.js";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, AuthRedirect } from "./Auth.js";
import { SpotifyProvider } from "./SpotifyContext";
import RedirectToLoginOrBroadcast from "./RedirectToLoginOrBroadcast";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <SpotifyProvider>
            <Header />
            <div className="App-content">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/auth/">
                  <AuthRedirect />
                </Route>
                <Route path="/u/:id">
                  <Channel />
                </Route>
                <Route path="/broadcast">
                  <RedirectToLoginOrBroadcast />
                </Route>
                <Route path="/premium_required">
                  {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                  <div className="App-msg">
                    Error: Spotify premium required for syncing with
                    eardrum.monster 😞
                  </div>
                </Route>
              </Switch>
            </div>
          </SpotifyProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
