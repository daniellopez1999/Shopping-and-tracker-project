import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { UsersModule } from '../infrastructure/users/type';

export class CheckUserRole {
  static async NotClient(req: Request, res: Response, next: NextFunction) {
    const allowedRoles = ['Courier', 'Admin', 'SuperAdmin'];

    const currentUser: UsersModule.User | undefined = get(req, 'identity');

    if (allowedRoles.includes(currentUser!.role!)) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }

  static async onlyAdmins(req: Request, res: Response, next: NextFunction) {
    const allowedRoles = ['Admin', 'SuperAdmin'];

    const currentUser: UsersModule.User | undefined = get(req, 'identity');

    if (allowedRoles.includes(currentUser!.role!)) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }

  static async onlySuperAdmin(req: Request, res: Response, next: NextFunction) {
    const allowedRoles = ['SuperAdmin'];

    const currentUser: UsersModule.User | undefined = get(req, 'identity');

    if (allowedRoles.includes(currentUser!.role!)) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  }
}
