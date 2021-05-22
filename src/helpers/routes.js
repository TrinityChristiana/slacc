import React from 'react';
import {
  Redirect,
  Switch
} from 'react-router-dom';
import LoggedOutRoute from '../components/custom-routes/LoggedOutRoute';
import PrivateRoute from '../components/custom-routes/PrivateRoute';
import ChannelPage from '../containers/ChannelPage';
import CreateOrgPage from '../containers/CreateOrgPage';
import ComposePage from '../containers/ComposePage';
import HomePage from '../containers/HomePage';
import OrgPage from '../containers/OrganizationPage';
import SelectOrgPage from '../containers/SelectOrgPage';
import UserDetailsPage from '../containers/UserDetailsPage';

const Routes = () => (
  <Switch>
    <LoggedOutRoute exact path='/' component={HomePage} />
    <PrivateRoute exact path='/o' component={SelectOrgPage} />
    <PrivateRoute exact path='/o/create' component={CreateOrgPage} />
    <PrivateRoute exact path='/o/:orgId' component={OrgPage} />
    <PrivateRoute exact path='/o/:orgId/compose' component={ComposePage} />
    <PrivateRoute exact path='/o/:orgId/user_profile/:userId' component={UserDetailsPage} />
    <PrivateRoute path='/o/:orgId/:channelId' component={ChannelPage} />
    <Redirect to='/'/>
  </Switch>
);

export default Routes;
