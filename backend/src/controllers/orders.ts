import { Request, Response } from 'express';
import { OrdersMongoose } from '../infrastructure/orders/repositories/orders';
import { UsersMongoose } from '../infrastructure/users/repositories/users';
import { ProductsMongoose } from '../infrastructure/products/repositories/products';
import { CreateOrder } from '../services/orderCases/createOrder';
import { BuyProducts } from '../services/productCases/buyProducts';
import { FindOrder } from '../services/orderCases/findOrder';
import { ChangeOrderStatus } from '../services/orderCases/changeOrderStatus';
import { GetUnassignedOrders } from '../services/orderCases/getUnassignedOrders';
import { validateCreateOrderData } from '../utils/validators';

export class Orders {
  static async getByID(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const ordersDB = new OrdersMongoose();
      const findOrder = new FindOrder(ordersDB);

      const order = await findOrder.exec(id);

      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async createOrder(req: Request, res: Response) {
    try {
      const { products, user_id, user_email, address } = req.body;

      const isCreateOrderDataValid = validateCreateOrderData({
        products,
        user_id,
        user_email,
        address,
      });

      if (!isCreateOrderDataValid)
        return res
          .status(401)
          .json({ error: 'Order could not be created due missing parameters' });

      const productsDB = new ProductsMongoose();
      const usersDB = new UsersMongoose();
      const ordersDB = new OrdersMongoose();

      const buyProductsBeforeOrder = new BuyProducts(productsDB);
      const productsList = await buyProductsBeforeOrder.exec(products);

      if ('error' in productsList) {
        return res.status(404).json({ error: productsList });
      }

      const createOrder = new CreateOrder(ordersDB, usersDB);
      const order = await createOrder.exec(
        products,
        user_id,
        user_email,
        address
      );

      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async changeOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const ordersDB = new OrdersMongoose();

      const changeOrderStatus = new ChangeOrderStatus(ordersDB);

      const order = await changeOrderStatus.exec(id);

      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async getUnassignedOrders(_req: Request, res: Response) {
    try {
      const ordersDB = new OrdersMongoose();

      const orders = new GetUnassignedOrders(ordersDB);

      const unassignedOrders = await orders.exec();

      return res.status(200).json({ unassignedOrders });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async getUserOrders(_req: Request, res: Response) {
    try {
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
