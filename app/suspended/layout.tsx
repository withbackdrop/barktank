import { ReactNode } from 'react';

import { UserState } from '@withbackdrop/backdrop-v3-common/db/models';
import { redirect } from 'next/navigation';

import { getUrlIndex } from '@/models/application/services/UrlService';
import { ContentLayout } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { SessionContextProvider } from '@/modules/application/contexts/SessionContext';
import useServerCurrentUser from '@/modules/application/hooks/useServerCurrentUser';

export default async function Layout({ children }: { children: ReactNode }) {
  const { user } = await useServerCurrentUser();
  if (!user || user.state !== UserState.SUSPENDED) {
    redirect(getUrlIndex());
  }

  return (
    <SessionContextProvider value={{ user }}>
      <ContentLayout>
        <ContentLayout.Content>{children}</ContentLayout.Content>
        <ContentLayout.Footer>
          <Footer />
        </ContentLayout.Footer>
      </ContentLayout>
    </SessionContextProvider>
  );
}
