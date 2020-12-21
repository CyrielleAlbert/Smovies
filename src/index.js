import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyB0S8KCH8A7O4wxn7aLI7YMk3PWVLW-mO0",
  authDomain: "smovies-48837.firebaseapp.com",
  projectId: "smovies-48837",
  storageBucket: "smovies-48837.appspot.com",
  messagingSenderId: "550918257010",
  appId: "1:550918257010:web:8010b0b53367ee589485eb",
  measurementId: "G-MZN2DRS2P8"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
