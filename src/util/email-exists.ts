import { getDB } from '@database/db';

export const emailExists = async (email: string): Promise<string> => {
  const data = await getDB().users.findOne({ email });

  if (data) return Promise.reject('email failed validation');
  return Promise.resolve('success');
};

