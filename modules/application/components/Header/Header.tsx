'use client';

import Link from 'next/link';

import { getUrlHome, getUrlLogin, getUrlNetworks, getUrlSignUp } from '@/models/application/services/UrlService';
import { Text, Button } from '@/modules/application/components/DesignSystem';
import { useSession } from '@/modules/application/contexts/SessionContext';
import BeaconLogo from '@/modules/common/components/BeaconLogo';

const Header = () => {
  const { user, logout } = useSession();
  return (
    <div className="flex items-center justify-between border-b-[1px] border-zinc-300 bg-white p-5">
      <div>
        <Link href={getUrlHome()}>
          <BeaconLogo size="s" />
        </Link>
      </div>
      {user ? (
        <div className="flex space-x-4">
          <Button theme="bare" size="s" href={getUrlNetworks()}>
            Networks
          </Button>
          <Button size="s" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Button size="s" href={getUrlSignUp()} theme="ghost">
            Sign up
          </Button>
          <Button size="s" href={getUrlLogin()}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
