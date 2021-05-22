import React from 'react';
import {
  Dropdown,
  Image,
  Menu
} from 'semantic-ui-react';
import { useAuth } from '../../contexts/auth-context';

const LoggedInHeader = () => {
  const {
    authUser: user,
    signOutUser,
  } = useAuth();

  return (
    <Menu>
      <Menu.Item>SLACC_LOGO</Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
        >
          <Dropdown icon={<Image src={user.photoURL} avatar />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={signOutUser}>
              Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default LoggedInHeader;
