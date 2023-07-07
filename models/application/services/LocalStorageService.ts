export const LOCAL_STORAGE_TWITTER_AUTH_LINK = 'twitterAuthLink';

export function setTwitterAuthLink(data): void {
  localStorage.setItem(LOCAL_STORAGE_TWITTER_AUTH_LINK, JSON.stringify(data));
}

export function getTwitterAuthLink() {
  const data = localStorage.getItem(LOCAL_STORAGE_TWITTER_AUTH_LINK);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export function removeTwitterAuthLink(): void {
  localStorage.removeItem(LOCAL_STORAGE_TWITTER_AUTH_LINK);
}
