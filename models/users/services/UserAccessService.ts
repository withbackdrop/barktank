import { ModelState, UserModel, UserState } from '@withbackdrop/backdrop-v3-common/db/models';

export function isUserActive(user: UserModel): boolean {
  return user && user?.state === UserState.ACTIVE;
}

export function isUserSuperAdmin(user: UserModel): boolean {
  return !!(user && user.isSuperAdmin);
}

export function shouldUserViewOnboarding(user: UserModel): boolean {
  if (!user) {
    return false;
  }

  if (user.modelState === ModelState.READY) {
    return false;
  }

  return !user.onboardedAt;
}
