'use client';

import { loginWithTwitter, logout } from '@/models/application/services/AuthenticationService';

import { Button } from './DesignSystem';

import { useSessionContext } from '../contexts/SessionContext';

const LoginButton = () => {
  const { user } = useSessionContext();

  if (user) {
    return (
      <Button theme="ghost" onClick={logout}>
        Logout
      </Button>
    );
  }

  return <Button onClick={loginWithTwitter}>Connect Twitter</Button>;
};

export default LoginButton;
