import express from 'express';
import { Orders } from '../controllers/orders';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CheckUserRole } from '../middlewares/checkUserRole';

const ordersRouter = express.Router();

ordersRouter.get(
  '/unassigned-orders',
  isAuthenticated,
  CheckUserRole.NotClient,
  Orders.getUnassignedOrders
);
ordersRouter.get('/:id', isAuthenticated, Orders.getByID);
ordersRouter.post('/create-order', isAuthenticated, Orders.createOrder);
ordersRouter.patch(
  '/change-status',
  isAuthenticated,
  CheckUserRole.NotClient,
  Orders.changeOrderStatus
);

export default ordersRouter;
