import { IUserPermissions } from '@user/controllers/userController';
export interface ISessionUser {
  permissions: IUserPermissions['permissions'];
  systemOrganisationId: string;
  organisationId: string | null;
  providerId: string;
  _id: string;
  email: string;
  isVerified: boolean;
  locale: string;
  name: string;
  picture: string;
}
