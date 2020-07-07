import React, {Component} from 'react';
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import './App.css';
import axios from 'axios';

class App extends Component{

  state = {
    users: [],
    loading: false, 
  }

  async componentDidMount(){ //This gets run every time the class gets excecuted 
    this.setState({loading: true}); //This changes the state 
    const res = await axios.get("https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}"); 
      
    //Store the response in a constant variable (need await and async)
    this.setState({users: res.data, loading: false});
  }

  render(){
    return (
        <div className = "App">
          <Navbar/>
          <div className = "container">
            <Users loading={this.state.loading} users={this.state.users}/>
          </div>
        </div>
      );

  }
  
}

export default App;
