import firebase from 'firebase/app';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { signInUser, signOutUser } from '../helpers/data/auth';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => setAuthUser(fbUser || false));
  }, []);

  const value = useMemo(
    () => ({
      authUser,
      signInUser,
      signOutUser,
      userLoading: authUser === null
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
