'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { setCookie } from 'cookies-next';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebaseApp from '@/firebase/config';
import { loginWithTwitter, logout } from '@/models/application/services/AuthenticationService';
import { COOKIE_TOKEN, removeCookie } from '@/models/application/services/SessionService';
import { getUrlHome, getUrlIndex, windowRedirect } from '@/models/application/services/UrlService';
import Spinner from '@/modules/common/components/animations/Spinner';

const auth = getAuth(firebaseApp);

type Session = {
  isLoading: boolean;
  user: User | null;
  login: () => any;
  logout: () => any;
};

export const SessionContext = createContext<Session>({} as Session);

export const SessionContextProvider = (props) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLogin = async () => {
    await loginWithTwitter();
    windowRedirect(getUrlHome());
  };

  const handleLogout = async () => {
    await logout();
    windowRedirect(getUrlIndex());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        setUser(_user);
        const idToken = await _user.getIdToken();
        setCookie(COOKIE_TOKEN, idToken);
      } else {
        setUser(null);
        removeCookie(COOKIE_TOKEN);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const memoizedUserContextValue = useMemo(
    () => ({
      isLoading,
      user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [isLoading, user]
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="l" align="center" />
      </div>
    );
  }

  return <SessionContext.Provider value={memoizedUserContextValue} {...props} />;
};

export const useSessionContext = () => useContext(SessionContext);
