import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';
export class CreateProduct {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(productSettings: ProductModule.Product) {
    const product = new ProductClass(this.productsDB);
    product.name = productSettings.name;
    product.description = productSettings.description;
    product.price = productSettings.price;
    product.quantity = productSettings.quantity;

    const productSave = await product.save();

    return productSave;
  }
}
