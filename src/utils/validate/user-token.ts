import { UserTokensT } from "@models/tables/user-tokens";

export function isUserTokenExpired(userToken: UserTokensT): boolean {
  if (new Date(userToken.user_token_expires_on) < new Date()) {
    // TODO: confirm this comparison works?
    return true;
  }
  return false;
}

export function isUserTokenAlreadyUsed(userToken: UserTokensT): boolean {
  if (userToken.user_token_used_on) {
    return true;
  }
  return false;
}
