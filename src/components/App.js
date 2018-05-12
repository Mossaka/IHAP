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
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
