import { getDB } from '@database/db';
import { MingoChanError } from '@errors/MingoChanError';
import { User } from '../../types/user';
import { HTTP_STATUS } from '@util/http-status';
import argon2 from 'argon2';
import { InsertOneWriteOpResult } from 'mongodb';
import { v4 as uuid } from 'uuid';

export type NewLocalUser = User;

export const createLocalUser = async (email: string, password: string): Promise<NewLocalUser> => {
  const passwordHash = await argon2.hash(password);

  const newUser: InsertOneWriteOpResult<NewLocalUser> = await getDB().users.insertOne({
    email,
    password: passwordHash,
    providerId: uuid(),
  });

  if (newUser.result.ok !== 1) throw new MingoChanError(HTTP_STATUS.INTERNAL_SERVER_ERROR.code, 'FAILED TO SAVE LOCAL USER TO DATABASE');

  return newUser.ops[0];
};
