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

  public async changeOrderStatus(
    order: OrderModule.Order
  ): Promise<OrderModule.Order> {
    try {
      const orderWithOldStatus = await Order.findById(order._id);

      if (order.status) orderWithOldStatus!.status = order.status;

      orderWithOldStatus!.save();

      return orderWithOldStatus as unknown as OrderModule.Order;
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async findUnassignedOrders(): Promise<OrderModule.Order[]> {
    try {
      const orders = await Order.find({ status: 'PENDING TO BE ACCEPTED' });

      return orders as unknown as OrderModule.Order[];
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }
}
