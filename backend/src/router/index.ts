import express from 'express';
import ordersRouter from './orders';
import productsRouter from './products';
import authenticationRouter from './authentication';
import usersRouter from './users';

const apiRouter = express.Router();

apiRouter.use('/orders', ordersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/auth', authenticationRouter);
apiRouter.use('/users', usersRouter);

export default apiRouter;
