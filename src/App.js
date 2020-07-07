import React, {Component} from 'react';
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import Search from './components/users/Search.js';
import './App.css';
import Alert from './components/layout/Alert.js';
import axios from 'axios';

class App extends Component{

  state = {
    users: [],
    loading: false, 
    alert: null,
  }
  //Not using this component anymore 
  // async componentDidMount(){ //This gets run every time the class gets excecuted 
  //   this.setState({loading: true}); //This changes the state 

  //   const res = await axios.get(`https://api.github.com/users?
  //   client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
  //   //Store the response in a constant variable (need await and async)
  //   this.setState({users: res.data, loading: false});
  // }

  //Search github users 
  searchUsers = async (text) => {

    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
      
    //Store the response in a constant variable (need await and async)
    this.setState({users: res.data.items, loading: false});
  }

  //Clear users from state 
  clearUsers = () => this.setState({users : [], loading: false});
  
  //Set the alert
  setAlert = (msg, type) =>{
    this.setState({alert: {msg, type}});

    setTimeout(()=> this.setState({alert: null}), 5000); //Use a timeout for 5 seconds to make alert disappear
    //Can also change the state of alert to null in searchUsers 

  } 

  render(){

    const {users, loading} = this.state; //Destructuring - pulling out users and loading from this.state

    return (
        <div className = "App">
          <Navbar/>
          <div className = "container">
            <Alert alert = {this.state.alert}/>
            <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} 
            showClear = { users.length > 0 ? true: false}
            setAlert = {this.setAlert} /> 
            <Users loading={loading} users={users}/>
          </div>
        </div>
      );

  }
  
}

export default App;
