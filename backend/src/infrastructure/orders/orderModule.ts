import { ProductModule } from '../products/types';
import { OrderModule } from './type';

export class Order implements OrderModule.Order {
  private readonly storage: OrderModule.OrderRepository;

  public _id: string | undefined;
  public products: ProductModule.Product[] | undefined;
  public user_id: string | undefined;
  public address: OrderModule.Address | undefined;
  public total_price: number | undefined;
  public status:
    | 'PENDING TO BE ACCEPTED'
    | 'ACCEPTED'
    | 'ON DELIVERY'
    | 'COMPLETED'
    | undefined;
  public createdAt: Date | undefined;
  public updatedAt: Date | undefined;

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
    const order = await this.storage.findByID(this._id!);
    return order;
  }

  public async changeOrderStatus(): Promise<OrderModule.Order> {
    const order = await this.storage.changeOrderStatus({
      _id: this._id,
      products: this.products,
      address: this.address,
      user_id: this.user_id,
      total_price: this.total_price,
      status: this.status,
    });
    return order;
  }

  public async findUnassignedOrders(): Promise<OrderModule.Order[]> {
    const orders = await this.storage.findUnassignedOrders();
    return orders;
  }
}
