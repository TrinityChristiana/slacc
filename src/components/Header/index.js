import React from 'react';
import { useAuth } from '../../contexts/auth-context';
import LoggedInHeader from './LoggedInHeader';
import LoggedOutHeader from './LoggedOutHeader';

const Header = () => {
  const {
    authUser: user,
    userLoading
  } = useAuth();

  if (userLoading) {
    return user;
  }

  if (user) {
    return <LoggedInHeader/>;
  }

  return <LoggedOutHeader/>;
};

export default Header;
