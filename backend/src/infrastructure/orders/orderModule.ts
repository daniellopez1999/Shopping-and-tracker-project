import { ProductModule } from '../products/types';
import { OrderModule } from './type';

export class Order implements OrderModule.Order {
  private readonly storage: OrderModule.OrderRepository;

  public id: string | undefined;
  public products: ProductModule.Product[] | undefined;
  public user_id: string | undefined;
  public address: OrderModule.Address | undefined;
  public total_price: number | undefined;

  constructor(storage: OrderModule.OrderRepository) {
    this.storage = storage;
  }

  public async create(): Promise<OrderModule.Order> {
    const order = await this.storage.createOrder({
      products: this.products,
      user_id: this.user_id,
      address: this.address,
      total_price: this.total_price,
    });
    return order;
  }

  public async find(): Promise<OrderModule.Order> {
    const order = await this.storage.findByID(this.id!);
    return order;
  }
}
