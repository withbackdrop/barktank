import {
  executeDeleteQuery as apiServiceExecuteDeleteQuery,
  executeGetQuery as apiServiceExecuteGetQuery,
  executePostQuery as apiServiceExecutePostQuery,
  executeMultipartFormPostQuery as apiServiceExecuteMultipartFormPostQuery,
} from '@/models/application/services/ApiService';
import { COOKIE_AUTH_TOKEN, getCookie } from '@/models/application/services/SessionService';

export abstract class AbstractApiService {
  protected readonly authToken: string;

  protected readonly throwErrors: boolean;

  constructor(authToken?: string | null, throwErrors = false) {
    if (authToken) {
      this.authToken = authToken;
    } else {
      this.authToken = getCookie(COOKIE_AUTH_TOKEN); // Will only be set if instantiating from the client side.
    }

    this.throwErrors = throwErrors;
  }

  async executeGetQuery<T>(endpoint: string): Promise<T | null> {
    return apiServiceExecuteGetQuery(encodeURI(endpoint), this.authToken, this.throwErrors);
  }

  async executePostQuery<T>(endpoint: string, data: Record<string, unknown>): Promise<T | null> {
    return apiServiceExecutePostQuery(encodeURI(endpoint), data, this.authToken, this.throwErrors);
  }

  async executeMultipartFormPostQuery<T>(endpoint: string, data: Record<string, unknown>): Promise<T | null> {
    return apiServiceExecuteMultipartFormPostQuery(encodeURI(endpoint), data, this.authToken, this.throwErrors);
  }

  async executeDeleteQuery<T>(endpoint: string): Promise<T | null> {
    return apiServiceExecuteDeleteQuery(encodeURI(endpoint), this.authToken, this.throwErrors);
  }
}
