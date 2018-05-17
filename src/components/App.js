import React, { Component } from 'react';
import logo from '../assets/logo.png';
import '../styles/App.css';
import Header from './common/Header';
import Signup from './common/Signup';
import Signin from './common/Signin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import ProfilePage from "./profile/ProfilePage";
import ViewTicket from "./ticket/ViewTicket";

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <header className="App-header">
          <Header/>
        </header>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Switch>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/tickets" component={ViewTicket}/>
          <Route component={HomePage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
