import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAQnR6ctk1Sh5HZBvx6qXQeSjPp8zNdy5Q",
  authDomain: "ihap-2018.firebaseapp.com",
  databaseURL: "https://ihap-2018.firebaseio.com",
  projectId: "ihap-2018",
  storageBucket: "ihap-2018.appspot.com",
  messagingSenderId: "556680483605"
};
firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
