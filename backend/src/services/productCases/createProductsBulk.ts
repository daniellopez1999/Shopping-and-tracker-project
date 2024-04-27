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

    //Get All Products
    const existingProducts = await product.getAll();
    // return {
    //   existingProducts: existingProducts,
    //   products: product.productsToBulk,
    // };

    //Check if the name of each product is in the Products list
    const repeatedProducts: ProductModule.Product[] = [];

    product.productsToBulk.map((product) => {
      existingProducts.map((existingProduct) => {
        if (existingProduct.name == product.name)
          repeatedProducts.push(existingProduct);
      });
    });

    if (repeatedProducts.length > 0) {
      return {
        Error: 'The following products already exists: ',
        repeatedProducts,
      };
    }
    //Return that array with message the following products are already created
    //don't create other products if at least 1 product exists

    const products = await product.saveProductsFromBulk();

    return products;
  }
}
