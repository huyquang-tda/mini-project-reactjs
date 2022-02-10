import React, { Component } from 'react';
import Home from '../pages/Home';
import Nav from './Nav';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Forget from '../pages/Forget';
import Reset from '../pages/Reset';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"; 
import axios from 'axios';
export class Header extends Component {
  state = {
      user: {}
  }

  componentDidMount(){
      if(localStorage.getItem('access_token')){
          axios.get('/auth/profile')
          .then((response) => {
              this.setUser(response.data)
          })
          .catch((error) => {
              console.log(error);
          });
      }      
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user} setUser={this.setUser}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login user={this.state.user} setUser={this.setUser}/>} />
          <Route path='/register' element={<Register user={this.state.user} setUser={this.setUser}/>} />
          <Route path='/profile' element={<Profile user={this.state.user} />} />
          <Route path='/forget' element={<Forget/>} />
          <Route path='/reset' element={<Reset/>} />
        </Routes>
      </Router>
    );
  }
}

export default Header;
