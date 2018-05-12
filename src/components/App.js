import React, { Component } from 'react';
import logo from '../assets/logo.png';
import '../styles/App.css';
import Header from './common/Header';
import Signup from './common/Signup';
import Signin from './common/Signup';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <header className="App-header">
          <Header/>
        </header>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
      </div>
    );
  }
}

export default App;
