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

  public async findDeliveredClientOrders(
    user_id: string
  ): Promise<OrderModule.Order[]> {
    try {
      const includedStatus = ['DELIVERED', 'COMPLETED'];

      const order = await Order.find({
        user_id: user_id,
        status: { $in: includedStatus },
      });

      return order as unknown as OrderModule.Order[];
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async findUndeliveredClientOrders(
    user_id: string
  ): Promise<OrderModule.Order[]> {
    try {
      const excludedStatus = ['DELIVERED', 'COMPLETED'];
      const order = await Order.find({
        user_id: user_id,
        status: { $nin: excludedStatus },
      });

      return order as unknown as OrderModule.Order[];
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async findCourierAssignedOrder(
    courier_id: string
  ): Promise<OrderModule.Order | null> {
    try {
      const excludedStatus = ['DELIVERED', 'COMPLETED'];
      const order = await Order.find({
        courier_id: courier_id,
        status: { $nin: excludedStatus },
      });

      if (order.length === 0) return null;

      return order[0] as unknown as OrderModule.Order;
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
  ): Promise<OrderModule.Order | OrderModule.Error> {
    try {
      const orderWithOldStatus = await Order.findById(order._id);

      if (order.status === 'COMPLETED') {
        return { Error: 'Status is already completed' };
      }

      if (order.status) orderWithOldStatus!.status = order.status;

      await orderWithOldStatus!.save();

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

  public async findOrderAndAssignToCourier(
    order_id: string,
    courier_id: string
  ): Promise<OrderModule.Order> {
    try {
      const order = await Order.findByIdAndUpdate(
        order_id,
        { courier_id: courier_id },
        { new: true }
      );

      return order as unknown as OrderModule.Order;
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }
}
