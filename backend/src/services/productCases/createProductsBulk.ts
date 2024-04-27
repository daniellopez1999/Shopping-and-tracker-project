import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';
import csvToJson from 'convert-csv-to-json';

export class CreateProductsBulk {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(file: any) {
    const product = new ProductClass(this.productsDB);

    const csvBufferToString = Buffer.from(file.buffer).toString('utf-8');

    product.productsToBulk = csvToJson
      .fieldDelimiter(',')
      .csvStringToJson(csvBufferToString);

    const products = await product.saveProductsFromBulk();

    return products;
  }
}
