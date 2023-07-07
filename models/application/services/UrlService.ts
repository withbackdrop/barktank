import slugify from 'slugify';

import { getCommunityEmail } from '@/models/application/services/EmailService';
import { isDevEnv } from '@/modules/application/constants/applicationConstants';

function isLocalhost(): boolean {
  return process.env.NEXT_PUBLIC_ENV === 'local';
}

export function getRootUrl(): string {
  if (isDevEnv) {
    return isLocalhost() ? 'http://localhost:3000' : 'https://alpha-dev.backdrop.so';
  }

  return `https://alpha.backdrop.so`;
}

export function getUrlIndex(): string {
  return `/`;
}

export function getUrlNetworks(): string {
  return `/networks`;
}

export function getUrlSuspended(): string {
  return `/suspended`;
}

export function getUrlLogin(urlAfterLogin?: string): string {
  let url = '/login';

  if (urlAfterLogin) {
    url += `?urlAfterLogin=${urlAfterLogin}`;
  }

  return url;
}

export function getUrlSignUp(): string {
  return '/signup';
}

export function getUrlHome(): string {
  return '/home';
}

export function getUrlForTwitterUsername(username: string): string {
  return `https://twitter.com/${username}`;
}

export function getUrlOnboarding(urlAfter?: string): string {
  let url = '/onboarding';

  if (urlAfter && !urlAfter.includes('login')) {
    url += `?urlAfter=${urlAfter}`;
  }

  return url;
}

export function getUrlTerms(): string {
  return '/terms';
}

export function getUrlPrivacy(): string {
  return '/privacy';
}

export function getIdFromSlug(slug: string): string | null {
  if (!slug) {
    return null;
  }

  const split = slug.split('-');

  return split[split.length - 1];
}

export const createUrl = (url, params = []): string => {
  if (params && params.length > 0) {
    return `${url}?${params.join('&')}`;
  }

  return url;
};

export const createSlug = (text: string, id: string): string => {
  if (!text) {
    return id;
  }

  return `${slugify(text.slice(0, 25))}-${id}`;
};

export function windowRedirect(url: string): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location = url;
}

export function getUrlForMailToCommunity(): string {
  return `mailto:${getCommunityEmail()}`;
}
