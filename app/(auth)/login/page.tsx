import { Metadata } from 'next';

import { getUrlSignUp } from '@/models/application/services/UrlService';
import { Card, Stack } from '@/modules/application/components/DesignSystem';
import { Hyperlink, Text } from '@/modules/application/components/DesignSystem/Elements';
import { LoginForm } from '@/modules/application/components/Login';
import BeaconLogo from '@/modules/common/components/BeaconLogo';

export const metadata: Metadata = {
  title: 'Beacon | Login',
  description: 'Your people-finder AI assistant',
};

const LoginPage = async () => (
  <div className="m-auto mt-10 flex max-w-2xl items-center justify-center md:mt-24">
    <Stack spacing="xxxl">
      <Stack.Item>
        <BeaconLogo />
      </Stack.Item>
      <Stack.Item>
        <Card>
          <LoginForm />
        </Card>
      </Stack.Item>
      <Stack.Item>
        <Text textAlign="center" spacing="l">
          Don't have an account?{' '}
          <Hyperlink theme="decorated" href={getUrlSignUp()}>
            <strong>Sign up</strong>
          </Hyperlink>
        </Text>
        <Text textAlign="center" size="s" color="gray-400">
          Designed by Backdrop Labs
        </Text>
      </Stack.Item>
    </Stack>
  </div>
);

export default LoginPage;
