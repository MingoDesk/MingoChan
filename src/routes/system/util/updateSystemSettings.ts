import { FindAndModifyWriteOpResultObject } from 'mongodb';
import { getDB } from '@database/db';

// TODO: ADD the ID here as a parameter coming from the session

const updateSystemSettings = async (
	data,
	updated: Date = new Date(),
): Promise<FindAndModifyWriteOpResultObject<any> | null> => {
	const create = await getDB().settings.findOneAndUpdate(
		{ _id: process.env.ORGANISATIONID },
		{ $set: { ...data, updated } },
		{ upsert: true, returnOriginal: false },
	);

	if (!create.value) {
		return null;
	}

	return create.value;
};

export { updateSystemSettings };
