import express from 'express';
import ordersRouter from './orders';

const apiRouter = express.Router();

apiRouter.use('/orders', ordersRouter);

export default apiRouter;
