/* eslint-disable no-nested-ternary */
import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useAuth } from '../contexts/auth-context';
import Routes from '../helpers/routes';
import Header from './Header';

const App = () => {
  const { userLoading } = useAuth();
  return (
    <>
      <Header />
      <Routes />
      <Dimmer active={userLoading}>
        <Loader indeterminate={true} size='massive'>Loading</Loader>
      </Dimmer>
    </>
  );
};

export default App;
