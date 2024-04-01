import { ProductClass } from '../../infrastructure/products/productModule';
import { ProductModule } from '../../infrastructure/products/types';

export class BuyProducts {
  private readonly productsDB: ProductModule.ProductsRepository;
  constructor(productsDB: ProductModule.ProductsRepository) {
    this.productsDB = productsDB;
  }

  public async exec(
    productsToBuy: ProductModule.ListOfProducts[]
  ): Promise<ProductModule.Product[] | ProductModule.ListOfProductsError> {
    const products = new ProductClass(this.productsDB);

    products.listOfProducts = productsToBuy;

    const productsWithoutEnoughQuantity: ProductModule.Product[] = [];
    const productsToBuyList = await products.findProductsToBuy();

    productsToBuyList.forEach((product) => {
      const productData = productsToBuy.find(
        (item) => item._id === product._id!.toString()
      );
      if (productData!.quantity > product.quantity!) {
        productsWithoutEnoughQuantity.push(product);
      } else {
        product.quantity! -= productData!.quantity;
      }
    });

    if (productsWithoutEnoughQuantity.length === 0) {
      products.listOfProductsToUpdate = productsToBuyList;
      const substractProductsToBuy = await products.substractProductsToBuy();

      return substractProductsToBuy;
    } else {
      return {
        error: 'The store has not enough quantity of the selected products',
        products: productsWithoutEnoughQuantity,
      };
    }
  }
}
