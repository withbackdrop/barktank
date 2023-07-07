import axios from 'axios';

import { isDevEnv } from '../constants/applicationConstants';

const api = axios.create({
  baseURL: isDevEnv ? 'https://alpha-dev-api.backdrop.so/' : 'https://alpha-api.backdrop.so/',
});

export { api };
