import { Metadata } from 'next';

import { Heading, Stack, Text } from '@/modules/application/components/DesignSystem';
import LoginButton from '@/modules/application/components/LoginButton';

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
  return (
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
            <Stack.Item>
              <Text textAlign="center" size="s" color="gray-500">
                A game by Backdrop Labs
              </Text>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </div>
  );
}
