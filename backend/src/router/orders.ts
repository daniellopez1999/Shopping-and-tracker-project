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
ordersRouter.get(
  '/delivered-user-orders/:user_id',
  isAuthenticated,
  Orders.getDeliveredClientOrders
);
ordersRouter.get(
  '/undelivered-user-orders/:user_id',
  isAuthenticated,
  Orders.getUndeliveredClientOrders
);
ordersRouter.get(
  '/courier-assigned-order/:courier_id',
  isAuthenticated,
  CheckUserRole.NotClient,
  Orders.getCourierAssignedOrder
);
ordersRouter.get('/:id', isAuthenticated, Orders.getByID);
ordersRouter.post('/create-order', isAuthenticated, Orders.createOrder);
ordersRouter.patch(
  '/assign-order',
  isAuthenticated,
  CheckUserRole.NotClient,
  Orders.assignOrder
);
ordersRouter.patch(
  '/change-status',
  isAuthenticated,
  CheckUserRole.NotClient,
  Orders.changeOrderStatus
);

export default ordersRouter;
