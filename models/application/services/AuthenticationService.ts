import { UserCredential } from '@firebase/auth';
import { captureException } from '@sentry/nextjs';
import { AUTH_TOKEN_DURATION_DAYS } from '@withbackdrop/backdrop-v3-common/constants';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import firebaseApp from '@/firebase/config';
import { AuthenticationApiService } from '@/models/application/services/api/AuthenticationApiService';
import { COOKIE_TOKEN, COOKIE_AUTH_TOKEN, removeCookie, setCookie } from '@/models/application/services/SessionService';

const auth = getAuth(firebaseApp);

export async function logout() {
  removeCookie(COOKIE_TOKEN);
  removeCookie(COOKIE_AUTH_TOKEN);
  localStorage.clear();

  return auth.signOut();
}

export async function login(email: string, password: string) {
  const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
  const { user }: any = result;
  const authToken = await getAuthToken(user.accessToken);

  setCookie(COOKIE_TOKEN, user.accessToken, AUTH_TOKEN_DURATION_DAYS);
  setCookie(COOKIE_AUTH_TOKEN, authToken, AUTH_TOKEN_DURATION_DAYS);
}

export async function getAuthToken(firebaseToken: string) {
  try {
    const service = new AuthenticationApiService(null, true);
    const result = await service.getAuthToken(firebaseToken);
    return result?.token;
  } catch (error) {
    captureException(error);
    return null;
  }
}

export async function verifyEmailByToken(token: string) {
  const service = new AuthenticationApiService(null, true);
  await service.verifyEmail(token);
}

export async function resendVerificationEmail(userEmailAddressId: string) {
  const service = new AuthenticationApiService(null, true);
  await service.resendVerificationEmail(userEmailAddressId);
}
