import React, { Fragment, useState} from 'react';
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import User from './components/users/User.js';
import Search from './components/users/Search.js';
import About from './components/pages/about.js';
import './App.css';
import Alert from './components/layout/Alert.js';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

const App = () => {

  //This allows us to use setx to set the variable, and we don't need this.state anymore
  const [users, setUsers] =useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  //Search github users 
  const searchUsers = async (text) => {

    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
    //Store the response in a constant variable (need await and async)
    setUsers(res.data.items);
    setLoading(false);
  }

  //Get a single github user 
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
    //Store the response in a constant variable (need await and async)
    setUser(res.data);
    setLoading(false);
  }
  //Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
    //Store the response in a constant variable (need await and async)
    setRepos(res.data);
    setLoading(false);
  }

  //Clear users from state 
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  
  //Set the alert
  const showAlert = (msg, type) =>{
    setAlert({msg, type});

    setTimeout(()=> setAlert(null), 5000); //Use a timeout for 5 seconds to make alert disappear
    //Can also change the state of alert to null in searchUsers 

  }



    return (
      <Router>

        <div className = "App">

          <Navbar/>

          <div className = "container">
            <Alert alert = {alert}/>

            <Switch>
              <Route exact path = "/" render = {props => (
                <Fragment>
                    <Search searchUsers = {searchUsers} clearUsers = {clearUsers} 
                    showClear = { users.length > 0 ? true: false}
                    setAlert = {showAlert} /> 
                    <Users loading={loading} users={users}/>
                </Fragment>
              )} />

              <Route exact path = "/about" component = {About}/>
              <Route exact path = "/user/:login" render = {props => (
                <User {...props} getUser = {getUser} 
                getUserRepos = {getUserRepos} 
                repos = {repos}
                user = {user} loading = {loading}/>
              )}/>
            </Switch>
            
          </div>
        </div>
      </Router>
      );

  
}

export default App;
