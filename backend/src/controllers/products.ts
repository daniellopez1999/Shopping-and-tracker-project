import { Request, Response } from 'express';
import { ProductsMongoose } from '../infrastructure/products/repositories/products';
import { CreateProduct } from '../services/productCases/createProduct';
import { FindProduct } from '../services/productCases/getProductById';
import { GetAllProduicts } from '../services/productCases/getAllProducts';
import { BuyProducts } from '../services/productCases/buyProducts';
import { GetProductsByType } from '../services/productCases/getProductsByType';

export class Products {
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const productsDB = new ProductsMongoose();
      const findProduct = new FindProduct(productsDB);

      const product = await findProduct.exec(id);

      return res.status(200).json({ product });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async getAllProducts(_req: Request, res: Response) {
    try {
      const productsDB = new ProductsMongoose();
      const allProducts = new GetAllProduicts(productsDB);

      const products = await allProducts.exec();

      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const { body } = req;

      const productsDB = new ProductsMongoose();
      const createProduct = new CreateProduct(productsDB);

      const product = await createProduct.exec(body);

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async buyProducts(req: Request, res: Response) {
    try {
      const productsToBuy = req.body;

      const productsDB = new ProductsMongoose();
      const buyProduct = new BuyProducts(productsDB);

      const product = await buyProduct.exec(productsToBuy);

      return res.status(200).json({ product });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }

  static async findProductsByType(req: Request, res: Response) {
    try {
      const { type } = req.params;

      const productsDB = new ProductsMongoose();
      const findProducts = new GetProductsByType(productsDB);

      const products = await findProducts.exec(type);

      return res.status(200).json({ products });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Error: error });
    }
  }
}
