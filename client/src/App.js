import React, { Component } from "react";
// import logo from "./images/logo.png";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StartButton from "./Components/StartButton";
import Dashboard from "./Components/Dashboard";
// import MembersList from "./Components/MembersList";
// import EditProfile from "./Components/EditProfile";
// import EventForm from "./Components/EventForm";
// import Footer from "./Components/Footer";
// import NodeGeocoder?

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">A Daily Map TESTING</h1>
          </header>
          <section className="body">
            <section className="main-menu" />
            <Switch>
              <Route path="/" exact component={StartButton} />
              <Route path="/home" exact component={Dashboard} />
              {/* <Route path="/members" exact component={MembersList} /> */}
              {/* <Route path="/profile/:id" exact component={EditProfile} /> */}
              {/* <Route path="/new_event/:id" exact component={EventForm} /> */}
            </Switch>
          </section>
          <section className="footer-container">{/* <Footer /> */}</section>
        </div>
      </Router>
    );
  }
}

export default App;
