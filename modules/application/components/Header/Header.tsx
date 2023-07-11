'use client';

import { logout } from '@/models/application/services/AuthenticationService';
import { getUrlLogin } from '@/models/application/services/UrlService';
import { Text, Button } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const Header = () => {
  const { user } = useSessionContext();

  return (
    <div className="flex items-center justify-between p-5">
      <div />
      {user ? (
        <div className="flex space-x-4">
          <Button size="s" theme="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button size="s" href={getUrlLogin()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Header;
