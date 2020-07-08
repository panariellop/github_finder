import React from "react";
import Navbar from "./components/layout/Navbar.js";
import User from "./components/users/User.js";
import About from "./components/pages/about.js";
import Home from "./components/pages/home";
import "./App.css";
import Alert from "./components/layout/Alert.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/alertState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />

            <div className="container">
              <Alert alert={alert} />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
