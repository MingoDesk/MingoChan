import { getDB } from '@database/db';
import { MingoChanError } from '@errors/mingochan-error';
import { User } from '../../types/user';
import { HTTP_STATUS } from '@util/http-status';
import argon2 from 'argon2';
import { v4 as uuid } from 'uuid';
import { Provider } from '@@types/provider';

export type NewLocalUser = User;

export const createLocalUser = async (email: string, password: string): Promise<void> => {
  const passwordHash = await argon2.hash(password);

  const newUser = await getDB().users.insertOne({
    email,
    password: passwordHash,
    providerId: uuid(),
    provider: Provider.local
  });

  if (!newUser.acknowledged) throw new MingoChanError(HTTP_STATUS.INTERNAL_SERVER_ERROR.code, 'FAILED TO SAVE LOCAL USER TO DATABASE');

  return Promise.resolve();
};
