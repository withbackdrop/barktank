import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';

import firebaseApp from '@/firebase/config';

export async function logout() {
  const auth = getAuth(firebaseApp);
  return auth.signOut();
}

export async function loginWithTwitter() {
  const provider = new TwitterAuthProvider();
  const auth = getAuth(firebaseApp);

  return signInWithPopup(auth, provider);
}
