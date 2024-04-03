import express from 'express';
import { UsersController } from '../controllers/users';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isOwner } from '../middlewares/isOwner';

const usersRouter = express.Router();

usersRouter.get(
  '/find-by-username/:username',
  isAuthenticated,
  UsersController.findUser
);
usersRouter.delete(
  '/delete/:id',
  isAuthenticated,
  isOwner,
  UsersController.deleteUser
);

export default usersRouter;
