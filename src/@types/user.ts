// import { IUserPermissions } from '@user/controllers/userController';
export interface User {
  // permissions: IUserPermissions['permissions'];
  _id: string;
  providerId: string;
  email: string;
  isVerified?: boolean;
  name?: string;
  picture?: string;
}
