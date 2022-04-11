import { User } from '@@types/user';
import { getDB } from '@database/db';

export const userExists = async (providerId: string): Promise<User> => {
  const user = await getDB().users.findOne({ providerId });
  if (!user) return Promise.reject(user);
  return Promise.resolve(user);
};
