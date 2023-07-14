import { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { adminSDK } from '@/firebase/firebaseAdmin';
import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_TOKEN } from '@/models/application/services/SessionService';
import { getUrlIndex } from '@/models/application/services/UrlService';
import { SessionContextProvider } from '@/modules/application/contexts/SessionContext';

export default async function Layout({ children }: { children: ReactNode }) {
  const authToken = getCookieOnServer(COOKIE_TOKEN);
  if (!authToken) {
    redirect(getUrlIndex());
  }

  const token = await adminSDK.auth().verifyIdToken(authToken);
  if (!token) {
    redirect(getUrlIndex());
  }

  return <SessionContextProvider>{children}</SessionContextProvider>;
}
