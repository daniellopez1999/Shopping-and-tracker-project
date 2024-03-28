import Product from '../model/products.model';
import { ProductModule } from '../types';

export class ProductsMongoose implements ProductModule.ProductsRepository {
  public async save({
    name,
    description,
    price,
    quantity,
  }: Partial<ProductModule.Product>): Promise<ProductModule.Product | null> {
    try {
      const newProduct = {
        name,
        description,
        price,
        quantity,
      };

      const product = await Product.findOne({ name });

      if (!product) {
        const res = await Product.create(newProduct);
        return {
          name: res.name,
          description: res.description,
          price: res.price,
          quantity: res.quantity,
        };
      } else {
        return null;
      }
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async findById(id: string): Promise<ProductModule.Product | null> {
    try {
      const product = await Product.findById(id);

      if (product) return product;
      else {
        return null;
      }
    } catch (error) {
      //@ts-ignore
      console.error(error);
      return null;
    }
  }
}
