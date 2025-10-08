import jwt, { Secret } from 'jsonwebtoken';
import { StringValue } from 'ms';

export const createJWT = (payload: object) => {
  const expiresIn = process.env.JWT_EXPIRES_IN as StringValue;
  const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
  return decoded;
};
