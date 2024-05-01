import { Request, Response } from 'express';
import { UsersMongoose } from '../infrastructure/users/repositories/users';
import { UserRegister } from '../services/usersCases/userRegister';
import { UserLogin } from '../services/usersCases/userLogin';

export class Authentications {
  static async register(req: Request, res: Response) {
    try {
      const { username, password, email, phone_number, role } = req.body;
      const usersDB = new UsersMongoose();

      const userCreation = new UserRegister(usersDB);

      const user = await userCreation.exec(
        username,
        password,
        email,
        phone_number,
        role
      );
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const usersDB = new UsersMongoose();

      const userLogin = new UserLogin(usersDB);
      const user = await userLogin.exec(username, password);

      if ('Error' in user) {
        return res.status(401).json({ message: user.Error });
      }

      res.cookie('SHOPPING-TRACKING-AUTH', user.authentication.sessionToken, {
        domain: 'localhost',
        path: '/',
      });

      res.cookie('username', user.username, {
        domain: 'localhost',
        path: '/',
      });

      res.cookie('email', user.email, {
        domain: 'localhost',
        path: '/',
      });

      res.cookie('user_id', encodeURIComponent(user._id), {
        domain: 'localhost',
        path: '/',
      });

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
