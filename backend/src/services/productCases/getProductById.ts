import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';
export class FindProduct {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(id: string) {
    const product = new ProductClass(this.productsDB);
    product.id = id;

    const productFind = await product.find();

    return productFind;
  }
}
