import { cookies } from 'next/headers';

export function getCookieOnServer(name: string): any {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name as any);
  if (!cookie) {
    return null;
  }

  return cookie.value;
}
