import { Metadata } from 'next';

import { getUrlLogin } from '@/models/application/services/UrlService';
import { Card, Stack } from '@/modules/application/components/DesignSystem';
import { Hyperlink, Text } from '@/modules/application/components/DesignSystem/Elements';
import { SignUpForm } from '@/modules/application/components/SignUp';
import BeaconLogo from '@/modules/common/components/BeaconLogo';

export const metadata: Metadata = {
  title: 'Beacon | Signup',
  description: 'Your people-finder AI assistant',
};

const SignUpPage = async () => (
  <div className="m-auto mt-10 flex max-w-xl items-center justify-center md:mt-24">
    <Stack spacing="xxxl">
      <Stack.Item>
        <BeaconLogo />
      </Stack.Item>
      <Stack.Item>
        <Card>
          <SignUpForm />
        </Card>
      </Stack.Item>
      <Stack.Item>
        <Text textAlign="center" spacing="l">
          Already have an account?{' '}
          <Hyperlink theme="decorated" href={getUrlLogin()}>
            <strong>Login</strong>
          </Hyperlink>
        </Text>
        <Text textAlign="center" size="s" color="gray-400">
          Designed by Backdrop Labs
        </Text>
      </Stack.Item>
    </Stack>
  </div>
);

export default SignUpPage;
