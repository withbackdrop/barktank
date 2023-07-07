import { User } from '@firebase/auth';
import { getAuth } from 'firebase/auth';

import firebaseApp from '@/firebase/config';

export function getCurrentUser(): User | null {
  const auth = getAuth(firebaseApp);
  return auth.currentUser;
}
