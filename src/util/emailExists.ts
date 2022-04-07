import { getDB } from '@database/db';

export const emailExists = async (email: string): Promise<boolean> => {
  const data = await getDB().users.findOne({ email });

  if (!data) false;
  return true;
};

