import { useParams, useRouteMatch } from 'react-router-dom';

const useAllParams = () => {
  const params = useParams();
  const compose = useRouteMatch('/o/:orgId/compose');

  return {
    userId: null,
    orgId: null,
    channelId: null,
    compose: !!compose,
    ...params
  };
};

export default useAllParams;
