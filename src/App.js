import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import ProfilePage from './profile/ProfilePage';
import TicketPage from './ticket/TicketPage';
import SearchPage from './searchResults/SearchPage';

export default class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Switch>
          <Route path="/ticket/:id" component={TicketPage} />
          <Route path="/search/:type/:keyword" component={SearchPage} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    );
  }
}
