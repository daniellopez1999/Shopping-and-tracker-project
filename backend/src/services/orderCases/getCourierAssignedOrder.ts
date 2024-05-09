import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class GetCourierAssignedOrder {
  private readonly ordersDB: OrderModule.OrderRepository;
  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(courier_id: string) {
    const order = new Order(this.ordersDB);
    order.courier_id = courier_id;

    const findOrder = await order.findCourierAssignedOrder();
    return findOrder;
  }
}
