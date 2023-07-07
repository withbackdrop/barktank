import { UserModel } from '@withbackdrop/backdrop-v3-common/db/models';

import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_AUTH_TOKEN } from '@/models/application/services/SessionService';
import { UserApiService } from '@/models/users/services/api/UserApiService';

const useServerCurrentUser = async () => {
  let user: null | UserModel = null;

  const authToken = getCookieOnServer(COOKIE_AUTH_TOKEN);
  if (authToken) {
    const service = new UserApiService(authToken, false);
    user = await service.getCurrentUser();
  }

  return { user, authToken };
};

export default useServerCurrentUser;
