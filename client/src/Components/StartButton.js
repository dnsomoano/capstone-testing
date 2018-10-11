import React, { Component } from "react";
import "../Stylings/StartButton.css";
import { Link } from "react-router-dom";

class StartButton extends Component {
  render() {
    console.log(process.env);
    return (
      <div>
        <section className="button-container">
          <Link to="/home">
            <button className="start-button" onClick={this.login}>
              Get Started
            </button>
          </Link>
        </section>
        <section>
          <Link to="/register">
            <span className="register-link">Register?</span>
          </Link>
        </section>
      </div>
    );
  }
}

export default StartButton;
