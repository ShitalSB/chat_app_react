import React, { Component } from "react";
import "./App.css";
const firebase = require("firebase");
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
        <h1 className="heading">Welcome!</h1>
        <form onSubmit={this.sendMessage}>
          <input
            className="inputMessage"
            type="text"
            placeholder="Type your message and hit enter"
            value={this.state.message}
            onChange={this.handleMessage}
          />
          {!this.state.history.length && (
            <div className="noMessage">You do not any messages</div>
          )}
          {this.state.history.map((mes, index) => {
            return (
              <p className="message" key={index}>
                {mes.message}
                <sub>{mes.date}</sub>
              </p>
            );
          })}
        </form>
      </div>
    );
  }
}

export default App;
