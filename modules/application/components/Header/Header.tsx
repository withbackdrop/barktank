'use client';

import { Button } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const Header = () => {
  const { user, logout } = useSessionContext();

  return (
    <div className="flex items-center justify-between p-5">
      <div />
      {user && (
        <div className="flex space-x-4">
          <Button size="s" theme="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
