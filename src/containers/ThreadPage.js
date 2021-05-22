import React from 'react';
import { useParams } from 'react-router-dom';

const ThreadPage = () => {
  const { messageId } = useParams();

  return <>{`Thread: ${messageId}`}</>;
};

export default ThreadPage;
