import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Login from "./Login.js";
import Messages from "./Messages.js";
import LoginWithEmail from './LoginWithEmail'



const firebase = require("firebase");
var provider = new firebase.auth.GoogleAuthProvider();

require("firebase/firestore");
var config = {
  apiKey: "AIzaSyD5OQdN3kOk_bGtXbDZDONCDfuUEFBCYYE",
  authDomain: "chat-app-v2-a8ca0.firebaseapp.com",
  databaseURL: "https://chat-app-v2-a8ca0.firebaseio.com",
  projectId: "chat-app-v2-a8ca0",
  storageBucket: "",
  messagingSenderId: "1024349411698"
};
firebase.initializeApp(config);

let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

class App extends Component {
  state = {
    message: "",
    history: []
  };
  componentDidMount = () => {
    // setInterval(()=>{
    let newArray = [];
    db.collection("chat-messages")
      .get()
      .then(doc => {
        doc.forEach(element => {
          newArray.push({
            message: element.data().message,
            date: element.data().timestamp
          });
        });
        console.log(newArray);
        newArray.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        this.setState(prevState => {
          return {
            history: newArray
          };
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    // },500)
  };
  sendMessage = e => {
    e.preventDefault();
    const date = new Date();
    if (this.state.message) {
      db.collection("chat-messages")
        .add({
          message: this.state.message,
          timestamp:
            date.getMonth() +
            "/" +
            date.getHours() +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds()
        })
        .then(response => {
          this.setState({ message: "" });
        });
    }
  };
  handleMessage = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/Login" />;
          }}
        />
         <Route
          exact
          path="/LoginWithEmail"
          render={() => {
            return <LoginWithEmail />;
          }}
        />
        <Route
          exact
          path="/Login"
          render={() => {
            return <Login />;
          }}
        />

        <Route
          exact
          path="/Messages"
          render={() => {
            return (
              <Messages
                history={this.state.history}
                message={this.state.message}
                handleMessage={this.handleMessage}
                sendMessage={this.sendMessage}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
