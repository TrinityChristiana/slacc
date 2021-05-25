import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import useAllParams from '../components/custom-hooks/useAllParams';
import { getOrganization } from '../helpers/data/organizations';

const OrgContext = createContext();
OrgContext.displayName = 'OrgContext';

const OrgProvider = (props) => {
  const [orgInfo, setOrgInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const updateAllOrgInfo = (orgId) => {
    setIsLoading(true);
    getOrganization(orgId).then((resp) => {
      setIsLoading(false);
      setOrgInfo(resp);
    });
    // get orgchannels
    // seperate private, public and dm's
    // get org members
  };

  const value = useMemo(
    () => ({
      orgInfo,
      isLoading,
      updateAllOrgInfo
    }),
    [orgInfo],
  );

  return (
    <OrgContext.Provider value={value} {...props} />
  );
};

const useOrg = () => {
  const context = useContext(OrgContext);
  const { updateAllOrgInfo } = context;

  const { orgId } = useAllParams();

  useEffect(() => {
    updateAllOrgInfo(orgId);
  }, [orgId]);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { OrgProvider, useOrg };
