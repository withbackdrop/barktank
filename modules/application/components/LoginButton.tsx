'use client';

import { getUrlHome } from '@/models/application/services/UrlService';
import { Button } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const LoginButton = () => {
  const { user, login, logout } = useSessionContext();

  if (user) {
    return (
      <div className="flex items-center">
        <Button href={getUrlHome()}>Play</Button>
        <Button theme="bare" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }

  return <Button onClick={login}>Login with Twitter</Button>;
};

export default LoginButton;
