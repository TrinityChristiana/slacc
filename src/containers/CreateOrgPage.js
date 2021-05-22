import { useParams } from 'react-router-dom';

const ComposePage = () => {
  const { orgId } = useParams();

  return `Compose Page Org: ${orgId}`;
};

export default ComposePage;
