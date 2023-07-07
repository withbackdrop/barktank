import { UserModel } from '@withbackdrop/backdrop-v3-common/db/models';

export function getUserDisplayName(user: UserModel): string {
  if (user.twitterUsername) return user.twitterUsername;
  if (user.name) return user.name;
  return user.email.substring(0, user.email.indexOf('@'));
}
