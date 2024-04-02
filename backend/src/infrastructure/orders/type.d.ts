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
      | 'COMPLETED';
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface Address {
    country: string;
    city: string;
    zip_zode: string;
  }

  interface OrderRepository {
    public findByID(id: string): Promise<OrderModule.Order>;
    public createOrder(
      orderData: OrderModule.Order
    ): Promise<OrderModule.Order>;
    public changeOrderStatus(
      order: OrderModule.Order
    ): Promise<OrderModule.Order>;
    public findUnassignedOrders(): Promise<OrderModule.Order[]>;
  }
}
