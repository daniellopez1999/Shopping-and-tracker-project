import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class GetUnassignedOrders {
  private readonly ordersDB: OrderModule.OrderRepository;

  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec() {
    const orderInstance = new Order(this.ordersDB);

    const orders = await orderInstance.findUnassignedOrders();
    return orders;
  }
}
