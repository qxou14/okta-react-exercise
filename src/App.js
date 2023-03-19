import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security, SecureRoute } from "@okta/okta-react";
import "./App.css";
import logo from "./logo.svg";
import Home from "./Home";

const oktaAuth = new OktaAuth({
  issuer: process.env.REACT_APP_ISSUER,
  clientId: process.env.REACT_APP_CLIENT_ID,
  //sends authentication response and token to this url
  //url redirect to after scuessful authenticate
  redirectUri: window.location.origin + "/login/callback",
});

function App(props) {
  //after otka succesffuly authenticate it, redirect to original url
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    props.history.replace(
      toRelativeUrl(originalUri || "/", window.location.origin)
    );
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Router>
  );
}

export default App;
