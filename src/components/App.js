import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import Signup from './common/Signup';
import Signin from './common/Signin';
import HomePage from './home/HomePage';
import ProfilePage from './profile/ProfilePage';
import ViewTicket from './ticket/ViewTicket';
import SearchPage from './searchResults/SearchPage';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Switch>
          <Route path="/profile" component={ProfilePage} />
          <Route path="/tickets" component={ViewTicket} />
          <Route path="/search" component={SearchPage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    );
  }
}
