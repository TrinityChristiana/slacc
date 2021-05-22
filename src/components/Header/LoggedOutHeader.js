import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { useAuth } from '../../contexts/auth-context';

const links = [
  {
    title: 'Create Org', link: '/o/create',
  },
  {
    title: 'View Orgs', link: '/o',
  }
];

const LoggedOutHeader = () => {
  const {
    signInUser,
  } = useAuth();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const MenuItems = () => links.map(({ title, link }, i) => {
    const active = activeItem === i;
    const name = `item-${i}`;

    return (
      <Menu.Item
        key={i}
        as='div'
        name={name}
        active={active}
        onClick={handleItemClick}
      >
        <Link to={link}>{title}</Link>
      </Menu.Item>
    );
  });

  return (
    <Menu>
      <Menu.Item>
        SLACC_LOGO
      </Menu.Item>
      <MenuItems/>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button color='blue' onClick={signInUser}>Sign In</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default LoggedOutHeader;
