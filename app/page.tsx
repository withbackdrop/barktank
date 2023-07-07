import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getCookieOnServer } from '@/models/application/services/ServerSessionService';
import { COOKIE_AUTH_TOKEN } from '@/models/application/services/SessionService';
import { getUrlHome, getUrlLogin } from '@/models/application/services/UrlService';
import { UserApiService } from '@/models/users/services/api/UserApiService';
import { Heading, Hyperlink, Stack, Text } from '@/modules/application/components/DesignSystem';

export const metadata: Metadata = {
  title: 'Bark Tank',
  description: 'Woof woof!',
};

export interface UserModel {
  id: string;
  username: string;
  createdAt: number;
  gamesCount: number;
}

export default async function HomePage() {
  const authToken = getCookieOnServer(COOKIE_AUTH_TOKEN);
  if (authToken) {
    const service = new UserApiService(authToken, false);
    const user: null | UserModel = await service.getCurrentUser();
    if (user) {
      redirect(getUrlHome());
    }
  }

  return (
    <div className="m-auto mt-10 flex max-w-2xl items-center justify-center md:mt-24">
      <Stack spacing="l">
        <Stack.Item>
          <Heading level={1} size="xxl">
            Bark Tank
          </Heading>
        </Stack.Item>
        <Stack.Item>
          <Heading level={3}>Let's raise the woof!</Heading>
        </Stack.Item>
        <Stack.Item>
          <Text textAlign="center" spacing="l">
            Have an account?{' '}
            <Hyperlink theme="decorated" href={getUrlLogin()}>
              <strong>Login</strong>
            </Hyperlink>
          </Text>
          <Text textAlign="center" size="s" color="gray-400">
            A game by Backdrop Labs
          </Text>
        </Stack.Item>
      </Stack>
    </div>
  );
}
