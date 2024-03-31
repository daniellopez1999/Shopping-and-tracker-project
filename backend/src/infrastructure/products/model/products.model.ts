import mongoose from 'mongoose';
import 'dotenv/config';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${process.env.DB_URL}`);
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
