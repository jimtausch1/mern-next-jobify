import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyJWT } from '../utils/tokenUtils.js';
import { BadRequestError, UnauthenticatedError, UnauthorizedError } from './customErrors.js';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');

  try {
    const { userId, role } = verifyJWT(token) as JwtPayload;
    const testUser = userId === '689b56e9ef5ee87ce80f2905';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};

export const checkForTestUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
  next();
};
