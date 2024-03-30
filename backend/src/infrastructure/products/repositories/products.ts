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

  public async getAllProducts(): Promise<ProductModule.Product[]> {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error(error);
      //@ts-ignore
      return { Error: error };
    }
  }

  public async buyProducts(
    listOfProducts: ProductModule.ListOfProducts[]
  ): Promise<ProductModule.Product[] | ProductModule.ListOfProductsError> {
    //check if there is enough quantity of each product
    //if there's, remove quantity from each product
    //if there is not, return null
    try {
      const productsWithoutEnoughQuantity: ProductModule.Product[] = [];

      const productIds = listOfProducts.map((product) => product.id);

      const products = await Product.find({ _id: { $in: productIds } });

      products.forEach((product) => {
        const productData = listOfProducts.find(
          (item) => item.id === product._id.toString()
        );
        if (productData!.quantity > product.quantity) {
          productsWithoutEnoughQuantity.push(product);
        } else {
          product.quantity -= productData!.quantity;
        }
      });

      if (productsWithoutEnoughQuantity.length === 0) {
        await Product.bulkWrite(
          products.map((product) => ({
            updateOne: {
              filter: { _id: product._id },
              update: { $set: { quantity: product.quantity } },
            },
          }))
        );

        return products;
      } else {
        return {
          error: 'The store has not enough quantity of the selected products',
          products: productsWithoutEnoughQuantity,
        };
      }
    } catch (error) {
      console.error(error);
      //@ts-ignore
      return { Error: error };
    }
  }
}
