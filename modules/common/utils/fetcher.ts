import { executeGetQuery } from '@/models/application/services/ApiService';
import { COOKIE_AUTH_TOKEN, getCookie } from '@/models/application/services/SessionService';

export const fetchFromAuthedApi = (url) => {
  const authToken = getCookie(COOKIE_AUTH_TOKEN);
  return executeGetQuery(url, authToken, true);
};
