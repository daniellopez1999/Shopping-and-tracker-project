import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class AssignOrderToCourier {
  private readonly ordersDB: OrderModule.OrderRepository;
  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(order_id: string, courier_id: string) {
    const order = new Order(this.ordersDB);
    order._id = order_id;
    order.courier_id = courier_id;

    const orderUpdated = await order.findOrderAndAssignToCourier();

    return orderUpdated;
  }
}
