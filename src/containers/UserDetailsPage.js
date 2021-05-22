import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetailsPage = () => {
  const { userId } = useParams();

  return <>{`User Details: ${userId}`}</>;
};

export default UserDetailsPage;
