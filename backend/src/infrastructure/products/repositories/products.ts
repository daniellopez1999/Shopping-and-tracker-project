import Product from '../model/products.model';
import { ProductModule } from '../types';
import { productList } from './productsMock';

export class ProductsMongoose implements ProductModule.ProductsRepository {
  public async createProductsTemplate(): Promise<
    ProductModule.Product[] | null
  > {
    try {
      const products = await Product.insertMany(productList);
      return products;
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }
  public async save({
    name,
    description,
    price,
    quantity,
    type,
    image,
  }: Partial<ProductModule.Product>): Promise<ProductModule.Product | null> {
    try {
      const newProduct = {
        name,
        description,
        price,
        quantity,
        type,
        image,
      };

      const product = await Product.findOne({ name });

      if (!product) {
        const res = await Product.create(newProduct);
        return res;
      } else {
        return null;
      }
    } catch (error) {
      //@ts-ignore
      return { Error: error };
    }
  }

  public async saveProductsFromBulk(
    productsToBulk: ProductModule.Product[] | undefined
  ): Promise<ProductModule.Product[] | null> {
    try {
      const products = await Product.insertMany(productsToBulk);

      return products;
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

  public async findAllProductTypes(): Promise<string[] | null> {
    try {
      const types = await Product.distinct('type');
      return types;
    } catch (error) {
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

      const productIds = listOfProducts.map((product) => product._id);

      const products = await Product.find({ _id: { $in: productIds } });

      products.forEach((product) => {
        const productData = listOfProducts.find(
          (item) => item._id === product._id.toString()
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

  public async findProductsToBuy(
    listOfProducts: ProductModule.ListOfProducts[]
  ): Promise<ProductModule.Product[]> {
    try {
      const productIds = listOfProducts.map((product) => product._id);

      const products = await Product.find({ _id: { $in: productIds } });

      return products;
    } catch (error) {
      console.error(error);
      //@ts-ignore
      return { Error: error };
    }
  }

  public async substractProductsToBuy(
    listOfProducts: ProductModule.Product[]
  ): Promise<ProductModule.Product[]> {
    try {
      await Product.bulkWrite(
        listOfProducts.map((product) => ({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { quantity: product.quantity } },
          },
        }))
      );

      const updatedProducts = await Product.find({
        _id: { $in: listOfProducts.map((product) => product._id) },
      });

      return updatedProducts;
    } catch (error) {
      console.error(error);
      //@ts-ignore
      return { Error: error };
    }
  }

  public async findProductsByType(
    types: string[]
  ): Promise<ProductModule.Product[]> {
    try {
      const products = await Product.find({ type: { $in: types } });

      return products;
    } catch (error) {
      console.error(error);
      //@ts-ignore
      return { Error: error };
    }
  }
}
