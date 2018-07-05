import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginWithEmail from './LoginWithEmail'
const firebase = require("firebase");
var provider = new firebase.auth.GoogleAuthProvider();

class Login extends Component {
  popUp = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        window.location = "/Messages";
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
          <Route
          exact
          path="/LoginWithEmail"
          render={() => {
            return <LoginWithEmail />;
          }}
        />
        <button><Link to="./LoginWithEmail">Sign In with Email/Password</Link></button>
        <button onClick={this.popUp}>Sign in with google</button>
      </div>
    );
  }
}

export default Login;
