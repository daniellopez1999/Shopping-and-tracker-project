import { ProductModule } from '../../infrastructure/products/types';
import { ProductClass } from '../../infrastructure/products/productModule';

export class GetProductsByType {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(types: string[]) {
    const products = new ProductClass(this.productsDB);
    products.types = types;

    const findProducts = await products.findProductsByType();

    return findProducts;
  }
}
