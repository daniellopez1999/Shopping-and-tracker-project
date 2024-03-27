import { Request, Response } from 'express';
import { ProductsMongoose } from '../infrastructure/products/repositories/products';
import { CreateProduct } from '../services/productCases/createProduct';

export class Products {
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      return res.status(200).json({ id });
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
}
