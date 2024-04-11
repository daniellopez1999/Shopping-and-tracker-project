import { OrderModule } from '../../infrastructure/orders/type';
import { ProductModule } from '../../infrastructure/products/types';
import { UsersModule } from '../../infrastructure/users/type';

import { Order } from '../../infrastructure/orders/orderModule';
import { Weather } from '../../infrastructure/weatherAPI/weatherModule';
import { SendEmail } from '../../infrastructure/sendEmailAPI/sendEmailModule';
import { UserClass } from '../../infrastructure/users/userModule';

export class CreateOrder {
  private readonly ordersDB: OrderModule.OrderRepository;
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(
    ordersDB: OrderModule.OrderRepository,
    usersDB: UsersModule.UsersRepository
  ) {
    this.ordersDB = ordersDB;
    this.usersDB = usersDB;
  }

  public async exec(
    products: ProductModule.Product[],
    user_id: string,
    user_email: string,
    address: OrderModule.Address
  ) {
    const user = new UserClass(this.usersDB);
    user.id = user_id;

    const order = new Order(this.ordersDB);
    order.products = products;
    order.user_id = user_id;
    order.address = address;
    order.email = user_email;

    let totalPrice = 0;
    order.products.forEach(
      (product) => (totalPrice += product.price! * product.quantity!)
    );

    //Get Weather of the city selected
    //First get coordinates to get weather.
    const weather = new Weather(order.address.city);
    const coordinates = await weather.getCoordinates();

    weather.lat = coordinates.lat;
    weather.lon = coordinates.lon;

    const cityWeather = await weather.getWeather();

    if (weather.possibleBadWeathers.includes(cityWeather.main)) {
      totalPrice += 2.0;
      totalPrice = parseFloat(totalPrice.toFixed(2));
    }

    order.total_price = totalPrice;

    const createOrder = await order.create();

    user.order_id = createOrder._id;

    const addOrderToUser = async () => {
      await user.addOrderToUser();
    };

    addOrderToUser();

    const email = new SendEmail(user_email);
    const sendEmail = async () => {
      const send = await email.sendOrderCreationEmail(createOrder);
      return send;
    };

    await sendEmail();

    return createOrder;
  }
}
