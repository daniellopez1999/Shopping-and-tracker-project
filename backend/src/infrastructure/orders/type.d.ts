import { ProductModule } from '../products/types';

export declare namespace OrderModule {
  interface Order {
    _id?: any;
    products?: ProductModule.Product[];
    user_id?: string;
    address?: Address;
    total_price?: number;
    status?:
      | 'PENDING TO BE ACCEPTED'
      | 'ACCEPTED'
      | 'ON DELIVERY'
      | 'DELIVERED'
      | 'COMPLETED';
    createdAt?: Date;
    updatedAt?: Date;
    email?: string;
  }

  interface Address {
    country: string;
    city: string;
    zip_zode: string;
  }

  interface Error {
    Error: string;
  }

  interface OrderRepository {
    public findByID(id: string): Promise<OrderModule.Order>;
    public createOrder(
      orderData: OrderModule.Order
    ): Promise<OrderModule.Order>;
    public changeOrderStatus(
      order: OrderModule.Order
    ): Promise<OrderModule.Order | OrderModule.Error>;
    public findUnassignedOrders(): Promise<OrderModule.Order[]>;
  }
}
