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
    product.type = productSettings.type;
    product.image = productSettings.image;

    const productSave = await product.saveProduct();

    return productSave;
  }
}
