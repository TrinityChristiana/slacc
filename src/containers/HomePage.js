import {
  Button,
  Grid,
  Segment
} from 'semantic-ui-react';
import React from 'react';
import { useAuth } from '../contexts/auth-context';

const HomePage = () => {
  const {
    signInUser
  } = useAuth();

  return (
    <Segment>
    <Grid>
      <Grid.Column textAlign="center">
        <Button onClick={signInUser}>Log In</Button>
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default HomePage;
