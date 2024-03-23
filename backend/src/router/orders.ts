import express from 'express';
import { Orders } from '../controllers/orders';

const ordersRouter = express.Router();

ordersRouter.get('/:id', Orders.getByID);

export default ordersRouter;
