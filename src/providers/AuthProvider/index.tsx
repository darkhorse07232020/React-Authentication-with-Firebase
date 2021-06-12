import React, { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from 'services/firebase';

type ContextProps = {
  user: firebase.User | null;
  profile: ProfileInfo | null;
  authenticated: boolean;
  setUser: any;
  setProfile: any;
  loadingAuthState: boolean;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState<ProfileInfo>();
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((authUser: any) => {
      setUser(authUser);
      setLoadingAuthState(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authenticated: user !== null,
        setUser,
        setProfile,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
