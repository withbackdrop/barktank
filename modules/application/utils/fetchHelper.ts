import { isDevEnv } from '@/modules/application/constants/applicationConstants';

function getBaseUrl() {
  return isDevEnv ? 'https://alpha-dev-api.backdrop.so/' : 'https://alpha-api.backdrop.so/';
}

function get(url: string, config = {}): Promise<any> {
  const requestOptions = {
    method: 'GET',
    ...config,
  };
  return fetch(`${getBaseUrl()}${url}`, requestOptions).then(handleResponse);
}

function post(url: string, body: any, config = {}) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...config,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// Prefixed with underscored because delete is a reserved word in JS.
function _delete(url) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// Helper functions.
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const fetchHelper = {
  get,
  post,
  put,
  delete: _delete,
};
