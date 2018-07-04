import React, { Component } from "react";
import "./App.css";
const firebase = require("firebase");
require("firebase/firestore");
const config = {
  apiKey: "AIzaSyBS_M75DmUROiK9Rvwbe9fFIIX3SKR4EdQ",
  authDomain: "chat-app-63a35.firebaseapp.com",
  databaseURL: "https://chat-app-63a35.firebaseio.com",
  projectId: "chat-app-63a35",
  storageBucket: "chat-app-63a35.appspot.com",
  messagingSenderId: "23285117397"
};
firebase.initializeApp(config);
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
class App extends Component {
  state = {
    message: "",
    history: []
  };
  componentDidMount=()=> {
    setInterval(()=>{
      let newArray=[];
      db.collection("chat-messages")
      .get()
      .then((doc)=> {
        //
        doc.forEach(element => {
          newArray.push(element.data().message)
         
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
    },1000)
   
  }
  sendMessage = e => {
    e.preventDefault();
    if (this.state.message) {
      db.collection("chat-messages")
        .add({ message: this.state.message })
        .then(response => {
          console.log(response);
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
          {this.state.history.map((message, index) => {
            return (
              <p className="message" key={index}>
                {message}
              </p>
            );
          })}
        </form>
      </div>
    );
  }
}

export default App;
