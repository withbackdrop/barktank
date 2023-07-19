import { isDevEnv } from '@/modules/application/constants/applicationConstants';

function isLocalhost(): boolean {
  return process.env.NEXT_PUBLIC_ENV === 'local';
}

export function getRootUrl(): string {
  if (isDevEnv) {
    return isLocalhost() ? 'http://localhost:3000' : 'https://barktankgame.com/';
  }

  return `https://barktankgame.com/`;
}

export function getUrlIndex(): string {
  return `/`;
}

export function getUrlHome(): string {
  return '/home';
}

export function getUrlProject(projectId: string): string {
  return `/project/${projectId}`;
}

export function windowRedirect(url: string): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location = url;
}
