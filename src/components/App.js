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
import Editor from './ticket/Editor';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
            <Editor>
            </Editor>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
