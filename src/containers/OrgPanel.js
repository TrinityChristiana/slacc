import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Menu,
  Popup,
  Sidebar
} from 'semantic-ui-react';
import useAllParams from '../components/custom-hooks/useAllParams';
import { useAuth } from '../contexts/auth-context';
import { getUsersOrganizations } from '../helpers/data/organizations';

const OrgPanel = () => {
  const { authUser: user } = useAuth();
  const { orgId } = useAllParams();

  const [allOrgs, setAllOrgs] = useState([]);

  useEffect(() => {
    getUsersOrganizations(user.uid).then(setAllOrgs);
  }, []);

  return (
    <Sidebar as={Menu} icon='labeled' inverted vertical visible width='very thin'>
      {allOrgs.map((org) => {
        const isCurrent = org.firebaseKey === orgId;
        return (
          <React.Fragment key={org.firebaseKey}>
            <br />
            <Popup
              position='right center'
              content={org.name}
              trigger={
                <Link
                  to={`/o/${org.firebaseKey}`}
                >
                  <div
                    style={{
                      background: `url(${org.image}) no-repeat`,
                      backgroundSize: 'cover',
                      opacity: isCurrent ? 1 : 0.25,
                      width: 35,
                      height: 35,
                      borderRadius: 6,
                    }}
                  ></div>
                </Link>
              }
            />
          </React.Fragment>
        );
      })}

      <Divider />
      <Button icon='add' color='blue' size='small' />
    </Sidebar>
  );
};

export default OrgPanel;
