import express from 'express';
import ordersRouter from './orders';
import productsRouter from './products';

const apiRouter = express.Router();

apiRouter.use('/orders', ordersRouter);
apiRouter.use('/products', productsRouter);

export default apiRouter;
