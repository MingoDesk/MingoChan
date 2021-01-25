import { ObjectId } from 'mongodb';
import { IPhoneData } from '../routes/user/helpers/verifyUserInput';

export interface IUser {
  _id: ObjectId;
  isLoggedIn: boolean;
  name: string;
  password: string;
  email: string;
  phone: IPhoneData;
  emailVerified: boolean;
  verifiedCustomer: boolean;
}
