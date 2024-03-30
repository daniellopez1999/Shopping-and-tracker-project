import { ProductModule } from '../../infrastructure/products/types';
import { ProductClass } from '../../infrastructure/products/productModule';

export class GetAllProduicts {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec() {
    const product = new ProductClass(this.productsDB);

    const productFind = await product.getAll();

    return productFind;
  }
}
