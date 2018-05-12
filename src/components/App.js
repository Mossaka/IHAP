import React, { Component } from 'react';
import logo from '../assets/logo.png';
import '../styles/App.css';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <h1 className="App-title">Welcome to IHAP</h1>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
