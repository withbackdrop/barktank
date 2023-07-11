'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebaseApp from '@/firebase/config';
import Spinner from '@/modules/common/components/animations/Spinner';

const auth = getAuth(firebaseApp);

type Session = {
  isLoading: boolean;
  user: User | null;
};

export const SessionContext = createContext<Session>({ isLoading: false, user: null });

export const SessionContextProvider = (props) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
