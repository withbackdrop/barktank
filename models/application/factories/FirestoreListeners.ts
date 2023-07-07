import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

import firebaseApp from '@/firebase/config';
import { COLLECTION_NAME } from '@/models/users/services/UserService';

const db = getFirestore(firebaseApp);

export function setupUserFirestoreListener(where, callback, onError?: any) {
  return onSnapshot(doc(db, COLLECTION_NAME, where.value), callback, onError);
}
