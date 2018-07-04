import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    message: "",
    history: []
  };
  sendMessage = e => {
    e.preventDefault();
    if (this.state.message)
      this.setState(prevState => {
        return { history: [...prevState.history, prevState.message], message:''};
      });
  };
  handleMessage = e => {
    this.setState({ message: e.target.value });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.sendMessage}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleMessage}
          />
          {!this.state.history.length && <div>you do not any messages</div>}
          {this.state.history.map((message,index)=>{
            return <p key={index}>{message}</p>
          })}
        </form>
      </div>
    );
  }
}

export default App;
