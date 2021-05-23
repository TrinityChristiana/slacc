import React from 'react';
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Menu
} from 'semantic-ui-react';
import { useAuth } from '../contexts/auth-context';

const SidePanel = () => {
  const { authUser: user, signOutUser, signInUser } = useAuth();

  const dropdownOptions = () => [
    {
      key: 'info',
      text: <span>Signed in as <strong>{user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'viewProfile',
      text: <span>View Profile</span>,
      disabled: true
    },
    {
      key: 'editProfile',
      text: <span>Edit Profile</span>,
      disabled: true
    },
    {
      key: 'signOut',
      text: <span onClick={signOutUser}>Sign Out</span>
    }
  ];

  return (
    <Menu
      size='large'
      inverted
      fixed='left'
      vertical
      style={{
        background: '#4c3c4c',
        fontSize: '1.2rem',
      }}
    >
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Header inverted as='h2' floated='left'>
              <Header.Content>Slacc</Header.Content>
            </Header>
          </Grid.Row>
          <Header as='h4'>
            {user ? <Dropdown
              trigger={'User'}
              options={dropdownOptions()}
            ></Dropdown> : <Button onClick={signInUser}>Sign In</Button>}
          </Header>
        </Grid.Column>
      </Grid>
    </Menu>
  );
};

export default SidePanel;