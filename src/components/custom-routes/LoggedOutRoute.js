import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const LoggedOutRoute = ({ component: Component, ...rest }) => {
  const { authUser: user, userLoading } = useAuth();

  if (userLoading) {
    return user;
  }

  const routeChecker = (burrito) => {
    if (!user) {
      return <Component {...burrito} {...rest} user={user} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/o',
          state: { from: burrito.location },
        }}
      />
    );
  };

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default LoggedOutRoute;
