import { ObjectId } from 'mongodb';

// import { IUserPermissions } from '@user/controllers/userController';
export interface User {
  // permissions: IUserPermissions['permissions'];
  _id: ObjectId;
  providerId: string;
  provider: number;
  email: string;
  password: string;
  isVerified?: boolean;
  name?: string;
  picture?: string;
}
