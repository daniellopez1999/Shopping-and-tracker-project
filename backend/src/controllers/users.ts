import { Request, Response } from 'express';
import { UsersMongoose } from '../infrastructure/users/repositories/users';

import { FindUserByUsername } from '../services/usersCases/findUserByUsername';
import { DeleteUserByID } from '../services/usersCases/deleteUserById';
import { GetUserRole } from '../services/usersCases/getUserRole';

export class UsersController {
  static async findUser(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const usersDB = new UsersMongoose();

      const userSearch = new FindUserByUsername(usersDB);

      const user = await userSearch.exec(username);

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usersDB = new UsersMongoose();

      const userDelete = new DeleteUserByID(usersDB);

      const user = await userDelete.exec(id);

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async getUserRole(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const usersDB = new UsersMongoose();

      const userRole = new GetUserRole(usersDB);

      const role = await userRole.exec(userid);

      return res.status(200).json({ role });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
