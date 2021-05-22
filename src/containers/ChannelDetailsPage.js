import React from 'react';
import { useParams } from 'react-router-dom';

const ChannelDetailsPage = () => {
  const { channelId } = useParams();

  return <>{`Channel Details: ${channelId}`}</>;
};

export default ChannelDetailsPage;
