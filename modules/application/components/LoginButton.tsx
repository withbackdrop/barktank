'use client';

import { Button } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const LoginButton = () => {
  const { user, login, logout } = useSessionContext();

  if (user) {
    return (
      <Button theme="ghost" onClick={logout} size="l">
        Logout
      </Button>
    );
  }

  return (
    <Button onClick={login} size="l">
      Login with Twitter
    </Button>
  );
};

export default LoginButton;
