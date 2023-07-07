'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebaseApp from '@/firebase/config';

const auth = getAuth(firebaseApp);

type Session = {
  isLoading: boolean;
  user: User | null;
};

export const SessionContext = createContext<Session>({ isLoading: false, user: null });

export const SessionContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const memoizedUserContextValue = useMemo(
    () => ({
      isLoading,
      user,
    }),
    [isLoading, user],
  );

  return <SessionContext.Provider value={memoizedUserContextValue} {...props} />;
};

export const useSessionContext = () => useContext(SessionContext);
