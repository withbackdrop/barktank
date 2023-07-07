import { UserModel, UserState } from '@withbackdrop/backdrop-v3-common/db/models';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_AUTH_TOKEN } from '@/models/application/services/SessionService';
import { getUrlLogin, getUrlOnboarding, getUrlSuspended } from '@/models/application/services/UrlService';
import { UserApiService } from '@/models/users/services/api/UserApiService';
import { shouldUserViewOnboarding } from '@/models/users/services/UserAccessService';
import AuthActions from '@/modules/application/constants/AuthActions';
import { isOnboardingUrl } from '@/modules/common/utils/urlUtils';

interface UseServerSession {
  isSuperAdminRestricted?: boolean;
  whenUnauthed?: string;
}

//  @todo-phil Experiment: Lets see if this strategy is a decent strategy.
const useServerSession = async ({
  isSuperAdminRestricted = false,
  whenUnauthed = AuthActions.RENDER,
}: UseServerSession) => {
  const authToken = getCookieOnServer(COOKIE_AUTH_TOKEN);
  if (!authToken && whenUnauthed === AuthActions.REDIRECT_TO_LOGIN) {
    redirect(getUrlLogin());
    return;
  }

  let user: null | UserModel = null;
  if (authToken) {
    const service = new UserApiService(authToken, false);
    user = await service.getCurrentUser();
    if (!user && whenUnauthed === AuthActions.REDIRECT_TO_LOGIN) {
      redirect(getUrlLogin());
      return;
    }

    if (isSuperAdminRestricted && !user.isSuperAdmin) {
      notFound();
    }

    if (user.state === UserState.SUSPENDED) {
      redirect(getUrlSuspended());
    }

    const headersList = headers();
    const headerUrl = headersList.get('x-url') || '';

    if (user && shouldUserViewOnboarding(user) && !isOnboardingUrl(headerUrl)) {
      redirect(getUrlOnboarding());
      return;
    }
  }

  return { user, authToken };
};

export default useServerSession;
