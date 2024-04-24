import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';

export class CreateProductsTemplate {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec() {
    const product = new ProductClass(this.productsDB);

    const productSave = await product.createProductsTemplate();

    return productSave;
  }
}
