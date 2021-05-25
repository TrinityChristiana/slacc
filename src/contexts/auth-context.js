import firebase from 'firebase/app';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { signInUser, signOutUser } from '../helpers/data/auth';
import { createOrganization, getUsersOrganizations } from '../helpers/data/organizations';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        getUsersOrganizations(fbUser.uid).then((userOrgs) => {
          setAuthUser({ ...fbUser, userOrgs });
        });
      } else {
        setAuthUser(false);
      }
    });
  }, []);

  const updateUserOrgs = () => {
    getUsersOrganizations(authUser.uid).then((userOrgs) => {
      setAuthUser((prev) => ({ ...prev, userOrgs }));
    });
  };

  const createOrg = (newOrgInfo) => (
    createOrganization(newOrgInfo)
      .then(([userOrgs, newOrgKey]) => {
        setAuthUser((prev) => ({
          ...prev,
          userOrgs
        }));

        return newOrgKey;
      })
  );

  const value = useMemo(
    () => ({
      authUser,
      signInUser,
      signOutUser,
      userLoading: authUser === null,
      updateUserOrgs,
      createOrg
    }),
    [authUser],
  );

  return (
    <AuthContext.Provider value={value} {...props} />
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
