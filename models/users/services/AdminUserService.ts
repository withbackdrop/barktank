import { UserModel, UserState } from '@withbackdrop/backdrop-v3-common/db/models';

import { updateFirestoreCollectionDocumentById } from '@/models/application/services/FirestoreService';
import { AdminUserApiService } from '@/models/users/services/api/AdminUserApiService';

const COLLECTION_NAME = 'users';

export async function getUsers(
  state: UserState.ACTIVE,
  startAfter?: number,
  limit = 10,
  orderBy?: string,
  orderDir?: string
): Promise<UserModel[]> {
  const apiService = new AdminUserApiService();
  return apiService.getUsers(state, startAfter, limit, orderBy, orderDir);
}

export async function updateUser(userId: string, dataToUpdate: Partial<UserModel>): Promise<UserModel> {
  return updateFirestoreCollectionDocumentById<UserModel>(COLLECTION_NAME, userId, dataToUpdate);
}
