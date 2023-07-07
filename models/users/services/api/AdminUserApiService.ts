import { UserModel, UserState } from '@withbackdrop/backdrop-v3-common/db/models';

import { AbstractApiService } from '@/models/application/services/api/AbstractApiService';

export class AdminUserApiService extends AbstractApiService {
  private static BASE_URL = '/admins';

  async getUsers(
    state: UserState.ACTIVE,
    startAfter?: number,
    limit = 10,
    orderBy = 'createdAt',
    orderDir = 'desc'
  ): Promise<UserModel[]> {
    const users = await this.executeGetQuery<any>(
      getAdminUsersApiEndpoint(state, startAfter, limit, orderBy, orderDir)
    );
    if (!users || users.length === 0) {
      return null;
    }

    return users;
  }
}

export function getAdminUsersApiEndpoint(
  state: UserState.ACTIVE,
  startAfter?: number,
  limit = 10,
  orderBy = 'createdAt',
  orderDir = 'desc'
) {
  let url = `admins/users/?limit=${limit}`;

  if (startAfter) {
    url += `&startAfter=${startAfter}`;
  }

  if (orderBy) {
    url += `&orderBy=${orderBy}`;
  }

  if (orderDir) {
    url += `&orderDir=${orderDir}`;
  }

  if (state) {
    url += `&state=${state}`;
  }

  return url;
}
