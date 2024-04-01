import { Request, Response } from 'express';
import { OrdersMongoose } from '../infrastructure/orders/repositories/orders';
import { CreateOrder } from '../services/orderCases/createOrder';

export class Orders {
  static async getByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      return res.status(200).json({ id });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async createOrder(req: Request, res: Response) {
    try {
      const { products, user_id, address } = req.body;
      const ordersDB = new OrdersMongoose();

      const createOrder = new CreateOrder(ordersDB);
      const order = await createOrder.exec(products, user_id, address);

      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
