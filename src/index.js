import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { OrgProvider } from './contexts/org-context';
import firebaseConfig from './helpers/apiKeys';
import Routes from './helpers/routes';
import './styles/main.scss';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <AuthProvider>
      <OrgProvider>
        <Routes />
      </OrgProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
