'use client';

import { useSessionContext } from '@/modules/application/contexts/SessionContext';

const Header = () => {
  const { user } = useSessionContext();
  return <header>header {user.displayName}</header>;
};

export default Header;
