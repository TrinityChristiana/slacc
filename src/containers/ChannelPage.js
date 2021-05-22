import React from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import ChannelDetailsPage from './ChannelDetailsPage';
import ThreadPage from './ThreadPage';
import UserDetailsPage from './UserDetailsPage';

const ChannelPage = () => {
  const { orgId, channelId } = useParams();
  const { path } = useRouteMatch();

  return (
    <>
      {`Channel Page Org: ${orgId} Channel: ${channelId}`}
      <div>
        <Route exact path={`${path}/thread/:messageId`} component={ThreadPage} />
        <Route exact path={`${path}/details`} component={ChannelDetailsPage} />
        <Route exact path={`${path}/user_profile/:userId`} component={UserDetailsPage} />
      </div>
    </>
  );
};

export default ChannelPage;
