import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash';
import { UsersMongoose } from '../infrastructure/users/repositories/users';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies['SHOPPING-TRACKING-AUTH'];

    if (!sessionToken)
      return res.status(400).json({ Error: 'No session token' });

    const usersDB = new UsersMongoose();

    const existingUser = await usersDB.getUserBySessionToken(sessionToken);

    if (!existingUser)
      return res.status(400).json({ Error: 'No session token' });

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    return res.status(400).json({ Error: 'User not authenticated' });
  }
};
