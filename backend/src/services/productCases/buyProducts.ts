import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';

export class BuyProducts {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(productsToBuy: ProductModule.ListOfProducts[]) {
    const products = new ProductClass(this.productsDB);
    products.listOfProducts = productsToBuy;

    const productsResult = await products.buy();
    return productsResult;
  }
}
