import Order from '../model/orders.model';
import { OrderModule } from '../type';

export class OrdersMongoose implements OrderModule.OrderRepository {
  public async findByID(id: string): Promise<OrderModule.Order> {
    try {
      const order = await Order.findById(id);

      return order as unknown as OrderModule.Order;
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async createOrder(
    orderData: OrderModule.Order
  ): Promise<OrderModule.Order> {
    try {
      const order = await Order.create(orderData);

      return order as unknown as OrderModule.Order;
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }
}
