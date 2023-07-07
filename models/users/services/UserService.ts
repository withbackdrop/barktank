import { User } from '@firebase/auth';
import { UserModel, UserState } from '@withbackdrop/backdrop-v3-common/db/models';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import firebaseApp from '@/firebase/config';
import {
  createFirestoreCollectionDocumentById,
  getFirestoreCollectionDocumentById,
  updateFirestoreCollectionDocumentById,
} from '@/models/application/services/FirestoreService';
import { UserApiService } from '@/models/users/services/api/UserApiService';

export const COLLECTION_NAME = 'users';

export async function getUserById(id: string): Promise<UserModel | null> {
  const user = await getFirestoreCollectionDocumentById<UserModel>(COLLECTION_NAME, id);
  if (!user) {
    return null;
  }

  return user;
}

export async function getCurrentUser(authToken?: string): Promise<UserModel | null> {
  const service = new UserApiService(authToken || null, true);
  return service.getCurrentUser();
}

export async function updateUser(userId: string, dataToUpdate: Partial<UserModel>): Promise<UserModel | null> {
  return updateFirestoreCollectionDocumentById<UserModel | null>(COLLECTION_NAME, userId, dataToUpdate);
}

export async function signUp(email: string, password: string): Promise<any> {
  const auth = getAuth(firebaseApp);
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredentials.user as User;

  return createFirestoreCollectionDocumentById(COLLECTION_NAME, user.uid, {
    email,
    state: UserState.ACTIVE,
  });
}
