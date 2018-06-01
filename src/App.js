import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import ProfilePage from './profile/ProfilePage';
import TicketPage from './ticket/TicketPage';
import SearchPage from './searchResults/SearchPage';
import './App.css';
import { GlobalContext } from './common/context';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state.user}>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/ticket/:id" component={TicketPage} />
            <Route path="/search/:keyword" component={SearchPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route component={HomePage} />
          </Switch>
        </div>
      </GlobalContext.Provider>
    );
  }
}
