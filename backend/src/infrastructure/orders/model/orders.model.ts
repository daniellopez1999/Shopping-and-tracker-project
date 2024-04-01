import mongoose from 'mongoose';
import 'dotenv/config';
import { ProductSchema } from '../../products/model/products.model';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${process.env.DB_URL}`);
}

const OrderSchema = new mongoose.Schema({
  products: {
    type: [ProductSchema],
    required: true,
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: String,
      required: true,
    },
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING TO BE ACCEPTED', 'ACCEPTED', 'ON DELIVERY', 'COMPLETED'],
    default: 'PENDING TO BE ACCEPTED',
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
