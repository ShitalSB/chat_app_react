import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
class Messages extends Component {
  
  render() {
    return (
      <div>
       
       <h1 className="heading">Welcome!</h1>
        <form onSubmit={this.props.sendMessage}>
          <input
            className="inputMessage"
            type="text"
            placeholder="Type your message and hit enter"
            value={this.props.message}
            onChange={this.props.handleMessage}
          />
          {!this.props.history.length && (
            <div className="noMessage">You do not any messages</div>
          )}
          {this.props.history.map((mes, index) => {
            return (
              <p className="message" key={index}>
                {mes.message}
                <sub>{mes.date}</sub>
              </p>
            )})};
            </form>
      </div>
    );
  }
}

export default Messages;
