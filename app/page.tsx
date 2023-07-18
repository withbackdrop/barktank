import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { adminSDK } from '@/firebase/firebaseAdmin';
import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_TOKEN } from '@/models/application/services/SessionService';
import { getUrlHome } from '@/models/application/services/UrlService';
import { ContentLayout, Text } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import LoginButton from '@/modules/application/components/LoginButton';

import bgEntrance from './images/entrance.png';

export const metadata: Metadata = {
  title: 'Bark Tank',
  description: 'Woof woof!',
};

export default async function IndexPage() {
  const authToken = getCookieOnServer(COOKIE_TOKEN);
  if (authToken) {
    const token = await adminSDK.auth().verifyIdToken(authToken);
    if (token) {
      redirect(getUrlHome());
    }
  }

  return (
    <ContentLayout>
      <ContentLayout.Header>
        <Header />
      </ContentLayout.Header>
      <ContentLayout.Content>
        <div className="relative m-auto w-full max-w-3xl overflow-hidden rounded-xl border-8">
          <Image src={bgEntrance} alt="Enter Bark Tank" />
          <div className="absolute bottom-0 z-10 flex w-full flex-col items-center space-y-4 px-24 py-6">
            <LoginButton />
            <Text textAlign="center" size="m" fontWeight="bold">
              You need to log in with Twitter to play Bark Tank. We do not post or read any data from your account.
            </Text>
          </div>
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
