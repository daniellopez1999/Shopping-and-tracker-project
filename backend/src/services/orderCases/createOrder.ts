import { OrderModule } from '../../infrastructure/orders/type';
import { ProductModule } from '../../infrastructure/products/types';
import { Order } from '../../infrastructure/orders/orderModule';

export class CreateOrder {
  private readonly ordersDB: OrderModule.OrderRepository;
  constructor(ordersDB: OrderModule.OrderRepository) {
    this.ordersDB = ordersDB;
  }

  public async exec(
    products: ProductModule.Product[],
    user_id: string,
    address: OrderModule.Address
  ) {
    const order = new Order(this.ordersDB);
    order.products = products;
    order.user_id = user_id;
    order.address = address;

    let totalPrice = 0;
    order.products.forEach((product) => (totalPrice += product.price!));

    order.total_price = totalPrice;

    const createOrder = await order.create();
    return createOrder;
  }
}
