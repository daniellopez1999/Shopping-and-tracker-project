import { ProductModule } from '../products/types';

export declare namespace OrderModule {
  interface Order {
    _id?: any;
    products?: ProductModule.Product[];
    user_id?: string;
    address?: Address;
    total_price?: number;
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
  }
}
