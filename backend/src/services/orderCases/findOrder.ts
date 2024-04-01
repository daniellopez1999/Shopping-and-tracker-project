import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class FindOrder {
  private readonly ordersDB: OrderModule.OrderRepository;
  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(id: string) {
    const order = new Order(this.ordersDB);
    order.id = id;

    const findOrder = await order.find();
    return findOrder;
  }
}
