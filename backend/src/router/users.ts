import express from 'express';
import { UsersController } from '../controllers/users';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CheckUserRole } from '../middlewares/checkUserRole';

const usersRouter = express.Router();

usersRouter.get(
  '/find-by-username/:username',
  isAuthenticated,
  CheckUserRole.onlyAdmins,
  UsersController.findUser
);
usersRouter.get(
  '/user-role/:userid',
  isAuthenticated,
  UsersController.getUserRole
);
usersRouter.delete(
  '/delete/:id',
  isAuthenticated,
  CheckUserRole.onlySuperAdmin,
  UsersController.deleteUser
);

export default usersRouter;
