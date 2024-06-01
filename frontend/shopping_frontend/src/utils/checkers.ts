import { UserInfo } from '../types/types';

export const checkIfUserIsLogged = (userData: UserInfo) => {
  if (!userData.email || !userData.user_id || !userData.username) return false;
  return true;
};
