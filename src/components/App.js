import React from 'react';
import { Dimmer, Grid, Loader } from 'semantic-ui-react';
import Messages from '../containers/Messages';
import MetaPanel from '../containers/MetaPanel';
import OrgPanel from '../containers/OrgPanel';
import SidePanel from '../containers/SidePanel';
import { useAuth } from '../contexts/auth-context';

const App = () => {
  const { authUser: user, userLoading } = useAuth();

  if (user) {
    return (
      <>
          <Grid columns='equal' className='app' divided>
            <OrgPanel />
            <SidePanel />
            <Grid.Column style={{ marginLeft: 320 }}>
              <Messages />
            </Grid.Column>
            <Grid.Column width={4}>
              <MetaPanel />
            </Grid.Column>
          </Grid>
      </>
    );
  }

  return (
    <>
      <Grid>
        <SidePanel />
      </Grid>
      <Dimmer active={userLoading}>
        <Loader indeterminate={true} size='massive'>Loading</Loader>
      </Dimmer>
    </>
  );
};

export default App;
