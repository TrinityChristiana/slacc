import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import App from '../components/App';
import PrivateRoute from '../components/custom-routes/PrivateRoute';

const Routes = () => (
  <Switch>
    {/* <LoggedOutRoute exact path='/' component={HomePage} /> */}
    {/* <PrivateRoute exact path='/o' component={SelectOrgPage} /> */}
    {/* <PrivateRoute exact path='/o/create' component={CreateOrgPage} /> Use Modal */}
    {/* <PrivateRoute exact path='/o/:orgId' component={OrgPage} /> */}
    {/* <PrivateRoute exact path='/o/:orgId/compose' component={ComposePage} /> */}
    {/* <PrivateRoute exact path='/o/:orgId/user_profile/:userId' component={UserDetailsPage} /> */}
    {/* <PrivateRoute path='/o/:orgId/:channelId' component={ChannelPage} /> */}
    <PrivateRoute
      path={[
        '/o/:orgId',
        '/o/:orgId/compose',
        '/o/:orgId/user_profile/:userId',
        '/o/:orgId/:channelId'
      ]}
      exact
      component={App}
    />
    <Route
      path='/'
      exact
      component={App}
    />
    <Redirect to='/'/>
  </Switch>
);

export default Routes;
