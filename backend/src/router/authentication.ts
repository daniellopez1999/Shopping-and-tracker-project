import express from 'express';
import { Authentications } from '../controllers/authentication';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', Authentications.register);
authenticationRouter.post('/login', Authentications.login);

export default authenticationRouter;
