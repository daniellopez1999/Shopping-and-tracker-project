import { ProductModule } from '../../infrastructure/products/types';
import { ProductClass } from '../../infrastructure/products/productModule';

export class GetAllProductTypes {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec() {
    const product = new ProductClass(this.productsDB);

    const types = await product.findAllProductTypes();

    return types;
  }
}
