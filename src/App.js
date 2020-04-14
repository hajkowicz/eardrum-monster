import React from "react";
import "./App.css";
import Header from "./Header.js";
import Channel from "./Channel.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, AuthRedirect } from "./Auth.js";
import { SpotifyProvider } from "./SpotifyContext.js";

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
              </Switch>
            </div>
          </SpotifyProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
