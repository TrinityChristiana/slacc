import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authUser: user, userLoading } = useAuth();

  if (userLoading) {
    return user;
  }

  const routeChecker = (burrito) => {
    if (!user) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: burrito.location }
          }}
        />
      );
    }

    return (
      <Component {...burrito} {...rest} user={user} />
    );
  };

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default PrivateRoute;
