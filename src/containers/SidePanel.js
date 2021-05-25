import React from 'react';
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Menu,
  Popup
} from 'semantic-ui-react';
import { useAuth } from '../contexts/auth-context';
import { useOrg } from '../contexts/org-context';

const SidePanel = () => {
  const { authUser: user, signOutUser, signInUser } = useAuth();
  const {
    orgInfo: { name },
  } = useOrg();

  const dropdownOptions = () => [
    {
      key: 'info',
      text: (
        <span>
          Signed in as <strong>{user.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: 'viewProfile',
      text: <span>View Profile</span>,
      disabled: true,
    },
    {
      key: 'editProfile',
      text: <span>Edit Profile</span>,
      disabled: true,
    },
    {
      key: 'signOut',
      text: <span onClick={signOutUser}>Sign Out</span>,
    },
  ];

  const orgMenuItems = [
    {
      key: 'invite',
      content: <span><Icon name='user plus'/> Check waitlist </span>,
      disabled: true
    },
    {
      key: 'channel',
      content: <span><Icon name='hashtag'/> Create Channel</span>,
      disabled: true
    },
    {
      key: 'manage',
      content: <span><Icon name='settings'/> Manage Workspace</span>,
      disabled: true
    },
    {
      key: 'leave',
      content: <span><Icon name='sign-out'/> Leave Organization</span>,
      disabled: true
    },
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
        <Grid.Row >
          <Popup
            trigger={
              <Header inverted as='h3'>
                {name || 'Select an Org'}
              </Header>
            }
            hideOnScroll
            on='click'
          >
            <Menu
              items={orgMenuItems}
              secondary
              vertical
            />
          </Popup>
        </Grid.Row>

          <Divider/>
          <Header inverted as='h4'>{user ? <Dropdown trigger={user.displayName} options={dropdownOptions()}></Dropdown> : <Button onClick={signInUser}>Sign In</Button>}</Header>
      </Grid>
    </Menu>
  );
};

export default SidePanel;
