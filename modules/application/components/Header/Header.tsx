'use client';

import { PowerIcon } from '@heroicons/react/20/solid';

import { Button } from '@/modules/application/components/DesignSystem';
import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const Header = () => {
  const { user, logout } = useSessionContext();

  return (
    <div className="flex items-center justify-between p-5">
      <div />
      {user && (
        <div className="flex space-x-4">
          <Button theme="bare" onClick={logout}>
            <Button.Icon icon={<PowerIcon className="w-4" />} />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
