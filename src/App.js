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
        <h1 className='heading'>Welcome!</h1>
        <form onSubmit={this.sendMessage}>
          <input
            className="inputMessage"
            type="text"
            placeholder='Type your message and hit enter'
            value={this.state.message}
            onChange={this.handleMessage}
          />
          {!this.state.history.length && <div className='noMessage'>You do not have any messages</div>}
          {this.state.history.map((message,index)=>{
            return <p className='message' key={index}>{message}</p>
          })}
        </form>
      </div>
    );
  }
}

export default App;
