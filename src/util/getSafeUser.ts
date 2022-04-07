import { User } from '../@types/user';

export interface SafeUser {
  // permissions: string[];
  providerId: string;
  email: string;
  isVerified: boolean;
  name: string;
  picture: string;
}

// TODO: get user permissions

export const getSafeUser = (userData: User): SafeUser => ({
  // permissions: userData.permissions,
  providerId: userData.providerId,
  email: userData.email,
  isVerified: userData.isVerified ?? false,
  name: userData.name ?? '',
  picture: userData.picture ?? ''
});
