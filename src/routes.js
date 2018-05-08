import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import ViewTicket from './components/ticket/ViewTicket';
import HomePage from './components/home/HomePage';
import ProfilePage from './components/profile/ProfilePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="tickets" component={ViewTicket} />
        <Route path="profile" component={ProfilePage} />
    </Route>
)