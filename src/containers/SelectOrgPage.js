import React, { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useAuth } from '../contexts/auth-context';
import { getUsersOrganizations } from '../helpers/data/organizations';

const SelectOrgPage = () => {
  const { authUser: user } = useAuth();

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    getUsersOrganizations(user.uid).then((resp) => {
      setOrgs(resp);
    });
  }, []);

  return (
    <Segment.Group>
      {orgs.map(({ name, firebaseKey }) => (
        <Segment key={firebaseKey}>{name}</Segment>
      ))}
    </Segment.Group>
  );
};

export default SelectOrgPage;
