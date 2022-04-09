import jwt from 'jsonwebtoken';

export const generateUserJwt = <T>(userData: T): string => {
  const token = jwt.sign(
    { data: userData, },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP }
  );

  return token;
};
