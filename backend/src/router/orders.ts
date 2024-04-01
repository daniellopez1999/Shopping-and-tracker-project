import express from 'express';
import { Orders } from '../controllers/orders';

const ordersRouter = express.Router();

ordersRouter.get('/:id', Orders.getByID);
ordersRouter.post('/create-order', Orders.createOrder);
ordersRouter.patch('/change-status', Orders.changeOrderStatus);

export default ordersRouter;
