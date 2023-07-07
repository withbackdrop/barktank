'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AUTH_TOKEN_DURATION_DAYS } from '@withbackdrop/backdrop-v3-common/constants';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import { setupUserFirestoreListener } from '@/models/application/factories/FirestoreListeners';
import { getAuthToken, logout } from '@/models/application/services/AuthenticationService';
import {
  COOKIE_AUTH_TOKEN,
  COOKIE_TOKEN,
  getCookie,
  removeCookie,
  setCookie,
} from '@/models/application/services/SessionService';
import { windowRedirect } from '@/models/application/services/UrlService';
import Spinner from '@/modules/common/components/animations/Spinner';

import firebaseApp from '../../../firebase/config';

const auth = getAuth(firebaseApp);

interface SessionContextInterface {
  user?: any;
  isLoading: boolean;
  logout: () => void;
}

export const SessionContext = createContext<SessionContextInterface>({} as SessionContextInterface);

export const useSession = () => useContext(SessionContext);

export const SessionContextProvider = ({ children, value }) => {
  const [user, setUser] = useState<any | null>(value?.user);
  const [isLoading, setIsLoading] = useState<boolean>(!value?.user);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await logout();

    windowRedirect(window.location.pathname);
  };

  useEffect(() => {
    let userListenerUnsubscribe: any = null;
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (!_user) {
        setUser(null);
        setIsLoading(false);

        removeCookie(COOKIE_TOKEN);
        removeCookie(COOKIE_AUTH_TOKEN);
      } else {
        const idToken = await _user.getIdToken();
        setCookie(COOKIE_TOKEN, idToken);

        const authToken = getCookie(COOKIE_AUTH_TOKEN);
        if (!authToken) {
          const token = await getAuthToken(idToken);
          if (token) {
            setCookie(COOKIE_AUTH_TOKEN, token, AUTH_TOKEN_DURATION_DAYS);
          }
        }

        userListenerUnsubscribe = setupUserFirestoreListener(
          {
            fieldPath: 'id',
            opStr: '==',
            value: _user.uid,
          },
          async (querySnapshot) => {
            setUser({ id: querySnapshot.id, ...querySnapshot.data() });
            setIsLoading(false);
          },
          () => router.refresh()
        );
      }
    });

    return () => {
      unsubscribe();
      userListenerUnsubscribe && userListenerUnsubscribe();
    };
  }, []);

  const memoizedContextValue = useMemo(
    () => ({
      isLoading,
      user,
      logout: handleLogout,
    }),
    [isLoading, user, handleLogout]
  );

  if (isLoading || isLoggingOut) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return <SessionContext.Provider value={memoizedContextValue}>{children}</SessionContext.Provider>;
};
