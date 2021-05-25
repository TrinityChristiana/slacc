import React from 'react';
import { Dimmer, Grid, Loader } from 'semantic-ui-react';
import Messages from '../containers/Messages';
import MetaPanel from '../containers/MetaPanel';
import OrgPanel from '../containers/OrgPanel';
import SidePanel from '../containers/SidePanel';
import { useAuth } from '../contexts/auth-context';
import { useOrg } from '../contexts/org-context';

const LoadingScreen = () => <Dimmer active>
<Loader indeterminate={true} size='massive'>
  Loading
</Loader>
</Dimmer>;

const ErrorScreen = () => 'There was an error, go back and try again';

const LoggoutOutView = () => (
  <>
    <Grid>
      <SidePanel />
    </Grid>
  </>
);

const LoggedInView = () => (
  <>
    <Grid columns='equal' className='app' divided>
      <OrgPanel />
      <SidePanel />
      <Messages />
      <MetaPanel />
    </Grid>
  </>
);

const App = () => {
  const { authUser: user, userLoading } = useAuth();
  const {
    orgInfo: {
      userCanAccess: userCanAccessOrg
    },
    isLoading: orgLoading
  } = useOrg();

  const appLoading = orgLoading || userLoading;

  if (appLoading) {
    return <LoadingScreen/>;
  }

  if (!userCanAccessOrg) {
    return <ErrorScreen/>;
  }

  if (user) {
    return <LoggedInView/>;
  }

  return <LoggoutOutView />;
};

export default App;
