import { UserModel } from '@withbackdrop/backdrop-v3-common/db/models';

import { AbstractApiService } from '@/models/application/services/api/AbstractApiService';

export class UserApiService extends AbstractApiService {
  private static BASE_URL = 'users';

  async getCurrentUser(): Promise<UserModel | null> {
    return this.executeGetQuery<UserModel>(`${UserApiService.BASE_URL}/me`);
  }
}
