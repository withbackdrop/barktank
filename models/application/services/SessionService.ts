import { getCookie as getNextCookie, setCookie as setNextCookie } from 'cookies-next';
import Cookies from 'js-cookie';

export const COOKIE_TOKEN = 'token';

export const COOKIE_DURATION_1_YEAR = 365;
export const COOKIE_DURATION_30_DAYS = 30;
export const COOKIE_DURATION_7_DAYS = 7;

export function setCookie(name: string, value: string, expires = COOKIE_DURATION_7_DAYS): void {
  Cookies.set(name, value, { path: '/', expires });
}

export function removeCookie(name: string): void {
  Cookies.remove(name);
}

export function getCookie(name: string): string {
  return Cookies.get(name);
}

export function getCookieFromNextJsContext(name: string, context) {
  return getNextCookie(name, context);
}

export function setNextJsCookie(name: string, value, context) {
  return setNextCookie(name, value, context);
}
