import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Menu,
  Popup,
  Sidebar
} from 'semantic-ui-react';
import useAllParams from '../components/custom-hooks/useAllParams';
import BrowseOrgModal from '../components/modals/BrowseOrgModal';
import OrgFormModal from '../components/modals/OrgFormModal';
import { useAuth } from '../contexts/auth-context';

const OrgPanel = () => {
  const { authUser: user } = useAuth();
  const { orgId } = useAllParams();

  return (
    <Sidebar as={Menu} icon='labeled' inverted vertical visible width='very thin'>
      {user.userOrgs.map((org) => {
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
      <OrgFormModal>
        <Button icon='add' color='blue' size='small' />
      </OrgFormModal>
      <Divider />
      <BrowseOrgModal>
        <Button icon='search' color='blue' size='small' />
      </BrowseOrgModal>
    </Sidebar>
  );
};

export default OrgPanel;
