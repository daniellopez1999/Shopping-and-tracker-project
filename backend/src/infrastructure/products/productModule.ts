import { ProductModule } from './types';

export class ProductClass implements ProductModule.Product {
  private readonly storage: ProductModule.ProductsRepository;

  public id: string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public price: number | undefined;
  public quantity: number | undefined;
  public type: string | undefined;
  public listOfProducts: ProductModule.ListOfProducts[] | undefined;
  public listOfProductsToUpdate: ProductModule.Product[] | undefined;

  constructor(storage: ProductModule.ProductsRepository) {
    this.storage = storage;
  }

  public async saveProduct(): Promise<ProductModule.Product | null> {
    const product = await this.storage.save({
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      type: this.type,
    });
    return product;
  }

  public async find() {
    const product = await this.storage.findById(this.id!);
    if (product) return product;
    else return null;
  }

  public async getAll() {
    const products = await this.storage.getAllProducts();
    return products;
  }

  public async findProductsToBuy() {
    const productsToBuy = await this.storage.findProductsToBuy(
      this.listOfProducts!
    );

    return productsToBuy;
  }

  public async substractProductsToBuy() {
    const productsToBuy = await this.storage.substractProductsToBuy(
      this.listOfProductsToUpdate!
    );
    return productsToBuy;
  }

  public async findProductsByType() {
    const products = await this.storage.findProductsByType(this.type!);
    return products;
  }
}
