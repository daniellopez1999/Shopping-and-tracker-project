import { Order } from '../../infrastructure/orders/orderModule';
import { OrderModule } from '../../infrastructure/orders/type';

export class ChangeOrderStatus {
  private readonly ordersDB: OrderModule.OrderRepository;

  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(id: string) {
    const order = new Order(this.ordersDB);
    order._id = id;

    const findOrder = await order.find();
    order.products = findOrder.products;
    order.user_id = findOrder.user_id;
    order.address = findOrder.address;
    order.total_price = findOrder.total_price;
    order.status = findOrder.status;

    switch (order.status) {
      case 'PENDING TO BE ACCEPTED':
        order.status = 'ACCEPTED';
        break;
      case 'ACCEPTED':
        order.status = 'ON DELIVERY';
        break;
      case 'ON DELIVERY':
        order.status = 'COMPLETED';
        break;
      default:
    }

    const changeOrderStatus = await order.changeOrderStatus();

    return changeOrderStatus;
  }
}
