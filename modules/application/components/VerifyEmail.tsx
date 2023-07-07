'use client';

import { useEffect, useState } from 'react';

import { verifyEmailByToken } from '@/models/application/services/AuthenticationService';
import { getUrlIndex } from '@/models/application/services/UrlService';
import { Button, Text } from '@/modules/application/components/DesignSystem';
import { notifyAboutError } from '@/modules/application/utils/notifyAboutError';
import Spinner from '@/modules/common/components/animations/Spinner';

const VerifyEmail = ({ token }: { token?: string }) => {
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await verifyEmailByToken(token);
        setIsBusy(false);
      } catch (error) {
        notifyAboutError(error);
      }
    })();
  }, [token]);

  return (
    <div className="m-auto flex w-full flex-col items-center justify-center py-12">
      {!isBusy && (
        <>
          <Text textAlign="center" size="l" fontWeight="semibold" spacing="l">
            Thank you for verifying your email!
          </Text>

          <Button href={getUrlIndex()}>Continue</Button>
        </>
      )}

      {isBusy && <Spinner size="l" />}
    </div>
  );
};

export default VerifyEmail;
