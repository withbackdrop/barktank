import { api } from '@/modules/application/utils/api';
import { fetchHelper } from '@/modules/application/utils/fetchHelper';

export async function executeGetQuery<T>(endpoint: string, authToken?: string, throwErrors = false): Promise<T | null> {
  let config = {};

  if (authToken) {
    config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
  }

  try {
    return await fetchHelper.get(endpoint, config);
  } catch (error) {
    if (throwErrors) {
      throw error;
    } else {
      return null;
    }
  }
}

export async function executePostQuery<T>(
  endpoint: string,
  data: Record<string, unknown>,
  authToken?: string,
  throwErrors = false
): Promise<T | null> {
  let config = {};

  if (authToken) {
    config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
  }

  return doPostQuery(endpoint, data, throwErrors, config);
}

export async function executeMultipartFormPostQuery<T>(
  endpoint: string,
  data: Record<string, unknown>,
  authToken?: string,
  throwErrors = false
): Promise<T | null> {
  let config = {};

  if (authToken) {
    config = {
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }

  return doPostQuery(endpoint, data, throwErrors, config);
}

async function doPostQuery<T>(
  endpoint: string,
  data: Record<string, unknown>,
  throwErrors = false,
  config
): Promise<T | null> {
  try {
    const result = await api.post(endpoint, data, config);

    return result?.data;
  } catch (error) {
    if (throwErrors) {
      throw error;
    } else {
      return null;
    }
  }
}

export async function executeDeleteQuery<T>(
  endpoint: string,
  authToken?: string,
  throwErrors = false
): Promise<T | null> {
  let config = {};

  if (authToken) {
    config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
  }

  try {
    const result = await api.delete(endpoint, config);

    return result?.data;
  } catch (error) {
    if (throwErrors) {
      throw error;
    } else {
      return null;
    }
  }
}
