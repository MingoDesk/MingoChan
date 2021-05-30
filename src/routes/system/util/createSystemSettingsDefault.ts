import { FindAndModifyWriteOpResultObject } from 'mongodb';
import { responseGenerator } from 'util/responseGenerator';
import { getDB } from '../../../database/db';
import { ISystemSettings } from '../controllers/systemsController';

// TODO: ADD the ID here as a parameter coming from the session

const updateSystemSettings = async (
	data,
	updated: Date = new Date(),
): Promise<FindAndModifyWriteOpResultObject<any> | null> => {
	const create = await getDB().settings.findOneAndUpdate(
		{ _id: '1eff307b-c25c-4c43-83c0-1752b2ebd7c2' },
		{ $set: { ...data, updated } },
		{ upsert: true, returnOriginal: false },
	);

	if (!create || !create.value) {
		return null;
	}

	return create.value;
};

export { updateSystemSettings };
