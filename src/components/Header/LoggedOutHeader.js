import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { useAuth } from '../../contexts/auth-context';

const LoggedOutHeader = () => {
  const {
    signInUser,
  } = useAuth();

  return (
    <Menu>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button color='blue' onClick={signInUser}>Sign In</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default LoggedOutHeader;
