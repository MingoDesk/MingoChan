import { IUserPermissions } from '@user/controllers/userController';
import { ObjectId } from 'mongodb';

export interface ISessionUser {
	permissions: IUserPermissions['permissions'];
	systemOrganisationId: string;
	organisationId: string | null;
	providerId: string;
	_id: ObjectId;
	email: string;
	isVerified: boolean;
	locale: string;
	name: string;
	picture: string;
}
