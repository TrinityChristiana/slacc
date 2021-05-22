import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

const OrgPage = () => {
  const { orgId } = useParams();
  const generalId = '123';

  return <Redirect to={`/o/${orgId}/${generalId}`} />;
};

export default OrgPage;
