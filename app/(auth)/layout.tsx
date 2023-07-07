import { ReactNode } from 'react';

import { UserModel } from '@withbackdrop/backdrop-v3-common/db/models';
import { redirect } from 'next/navigation';

import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_AUTH_TOKEN } from '@/models/application/services/SessionService';
import { getUrlHome } from '@/models/application/services/UrlService';
import { UserApiService } from '@/models/users/services/api/UserApiService';
import { ContentLayout } from '@/modules/application/components/DesignSystem';

export default async function Layout({ children }: { children: ReactNode }) {
  const authToken = getCookieOnServer(COOKIE_AUTH_TOKEN);
  if (authToken) {
    const service = new UserApiService(authToken, false);
    const user: null | UserModel = await service.getCurrentUser();
    if (user) {
      redirect(getUrlHome());
    }
  }

  return (
    <ContentLayout>
      <ContentLayout.Content>{children}</ContentLayout.Content>
    </ContentLayout>
  );
}
