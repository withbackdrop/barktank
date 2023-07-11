import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { adminSDK } from '@/firebase/firebaseAdmin';
import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_TOKEN } from '@/models/application/services/SessionService';
import { getUrlHome } from '@/models/application/services/UrlService';
import { ContentLayout, Heading, Stack, Text } from '@/modules/application/components/DesignSystem';
import { Footer } from '@/modules/application/components/Footer';
import { Header } from '@/modules/application/components/Header';
import LoginButton from '@/modules/application/components/LoginButton';

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
        <div className="m-auto mt-10 flex max-w-2xl items-center justify-center md:mt-24">
          <Stack alignItems="center" spacing="xxxl">
            <Stack.Item>
              <Stack spacing="s" alignItems="center">
                <Stack.Item>
                  <Heading level={1} size="xxl" textAlign="center">
                    Bark Tank
                  </Heading>
                </Stack.Item>
                <Stack.Item>
                  <Heading level={3} textAlign="center" size="xl">
                    Let's raise the woof!
                  </Heading>
                </Stack.Item>
                <Stack.Item>
                  <LoginButton />
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item>
              <Stack alignItems="center">
                <Stack.Item>
                  <Text textAlign="center" size="s" color="gray-500">
                    You need to log in with Twitter to play. We do not post or read any data from your account.
                  </Text>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </div>
      </ContentLayout.Content>
      <ContentLayout.Footer>
        <Footer />
      </ContentLayout.Footer>
    </ContentLayout>
  );
}
