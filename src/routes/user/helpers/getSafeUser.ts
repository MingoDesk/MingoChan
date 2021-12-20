import { Request } from 'express';
import { UserPermissions } from '../controllers/userController';

interface SafeUser {
  permissions: UserPermissions;
  providerId: string;
  email: string;
  isVerified: boolean;
  locale: string;
  name: string;
  picture: string;
}

// Safe user returns data that is "safe" to send to the client i.e not sensetive data such as passwords

export const getSafeUser = (req: Request): SafeUser | null => {
  const u = req.user;

  if (!u) return null;
  return {
    permissions: u.permissions,
    providerId: u.providerId,
    email: u.email,
    isVerified: u.isVerified,
    locale: u.locale,
    name: u.name,
    picture: u.picture,
  };
};
