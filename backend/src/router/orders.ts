import express from 'express';
import { Orders } from '../controllers/orders';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const ordersRouter = express.Router();

ordersRouter.get(
  '/unassigned-orders',
  isAuthenticated,
  Orders.getUnassignedOrders
);
ordersRouter.get('/:id', isAuthenticated, Orders.getByID);
ordersRouter.post('/create-order', isAuthenticated, Orders.createOrder);
ordersRouter.patch('/change-status', isAuthenticated, Orders.changeOrderStatus);

export default ordersRouter;
