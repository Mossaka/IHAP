import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes'
import {Router, browserHistory} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    //<App />, document.getElementById('root')
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('root')
);
registerServiceWorker();
