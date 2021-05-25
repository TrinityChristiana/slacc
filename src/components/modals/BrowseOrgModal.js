/* eslint-disable react/no-unescaped-entities */
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  List,
  Modal
} from 'semantic-ui-react';
import {
  activateUserOrganization,
  createUserOrg,
  deactivateUserOrganization,
  getAllOrganizations
} from '../../helpers/data/organizations';

const BrowseOrgModal = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [allOrgs, setAllOrgs] = useState([]);
  const [fiteredOrgs, setFilteredOrgs] = useState([]);

  const handleChange = (e) => {
    setFilteredOrgs(allOrgs.filter((org) => org.name.includes(e.target.value)));
  };

  const resetOrgs = () => {
    getAllOrganizations().then((orgs) => {
      setAllOrgs(orgs);
      setFilteredOrgs(orgs);
    });
  };

  const leaveOrg = (userOrgKey) => {
    deactivateUserOrganization(userOrgKey).then(resetOrgs);
  };

  const rejoin = (userOrgKey) => {
    activateUserOrganization(userOrgKey).then(resetOrgs);
  };

  const askToJoin = (firebaseKey) => {
    const {
      uid: userId,
      displayName,
      email,
      photoURL: profilePic
    } = firebase.auth().currentUser;

    createUserOrg({
      displayName,
      userId,
      username: email.split('@')[0],
      isAdmin: false,
      active: false,
      profilePic,
      organizationId: firebaseKey,
      bio: '',
      accepted: false,
      deactivated: false
    }).then(resetOrgs);
  };

  useEffect(() => {
    if (open) {
      resetOrgs();
    } else {
      setAllOrgs([]);
      setFilteredOrgs([]);
    }
  }, [open]);

  const OrgActionButton = ({
    orgKey,
    userOrg: {
      isAdmin,
      accepted,
      firebaseKey,
      deactivated
    }
  }) => {
    if (isAdmin) {
      return <Button disabled>You're the Admin</Button>;
    }

    if (!firebaseKey || deactivated) {
      return <Button onClick={() => (
        deactivated ? rejoin(firebaseKey) : askToJoin(orgKey)
      )}>Ask to Join</Button>;
    }

    if (!accepted) {
      return <Button onClick={() => leaveOrg(firebaseKey)}>Remove Invite</Button>;
    }

    return <Button onClick={() => leaveOrg(firebaseKey)}>Leave</Button>;
  };

  return (
    <Modal size='large' onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={children}>
      <Modal.Header>
        Browse Organizations
        <Input
          onChange={handleChange}
          icon='search'
        />
      </Modal.Header>
      <Modal.Content scrolling>
      <List divided verticalAlign='middle'>
        {fiteredOrgs.map(({
          firebaseKey,
          name,
          userOrg
        }) => (
          <List.Item key={firebaseKey}>
           <List.Content floated='right'>
             <OrgActionButton orgKey={firebaseKey} userOrg={userOrg || {}}/>
           </List.Content>
           <List.Content>{name}</List.Content>
         </List.Item>
        ))}
      </List>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default BrowseOrgModal;
