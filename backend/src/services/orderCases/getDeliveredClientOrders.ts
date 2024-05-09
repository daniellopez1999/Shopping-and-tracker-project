import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class GetDeliveredClientOrders {
  private readonly ordersDB: OrderModule.OrderRepository;
  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(user_id: string) {
    const order = new Order(this.ordersDB);
    order.user_id = user_id;

    const findOrder = await order.findDeliveredClientOrders();
    return findOrder;
  }
}
