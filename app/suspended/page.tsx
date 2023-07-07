import { Metadata } from 'next';

import { getUrlForMailToCommunity } from '@/models/application/services/UrlService';
import { Hyperlink, Text, Heading } from '@/modules/application/components/DesignSystem';

export const metadata: Metadata = {
  title: 'Beacon | Suspended',
  description: 'Your people-finder AI assistant',
};

const SuspendedPage = async () => (
  <div className="m-auto flex max-w-2xl items-center justify-center md:mt-24">
    <div>
      <Heading level={0} size="xl" textAlign="center" spacing="s">
        Account Suspended
      </Heading>
      <Text textAlign="center" spacing="xl" fontFamily="mono" color="gray-400">
        Your account has been suspended
      </Text>
      <Text textAlign="center" spacing="xl" fontFamily="mono" color="gray-400">
        <Hyperlink target="_blank" theme="decorated" href={getUrlForMailToCommunity()}>
          Click here
        </Hyperlink>{' '}
        to contact us
      </Text>
    </div>
  </div>
);

export default SuspendedPage;
