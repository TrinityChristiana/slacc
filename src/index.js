import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { AuthProvider } from './contexts/auth-context';
import firebaseConfig from './helpers/apiKeys';
import './styles/main.scss';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
