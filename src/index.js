import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {FireBaseContext} from './store/FireBaseContext'
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase/config'
import Post from './store/PostContext'
import  Context from './store/FireBaseContext';
ReactDOM.render(

    <FireBaseContext.Provider value={{firebase}}>
      <Context><Post>
    <App />
    </Post></Context>
  </FireBaseContext.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
