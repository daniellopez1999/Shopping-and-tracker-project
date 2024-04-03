import express from 'express';
import ordersRouter from './orders';
import productsRouter from './products';
import authenticationRouter from './authentication';

const apiRouter = express.Router();

apiRouter.use('/orders', ordersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/auth', authenticationRouter);

export default apiRouter;
