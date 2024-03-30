import { ProductModule } from './types';

export class ProductClass implements ProductModule.Product {
  private readonly storage: ProductModule.ProductsRepository;

  public id: string | undefined;
  public name: string | undefined;
  public description: string | undefined;
  public price: number | undefined;
  public quantity: number | undefined;
  public listOfProducts: ProductModule.ListOfProducts[] | undefined;

  constructor(storage: ProductModule.ProductsRepository) {
    this.storage = storage;
  }

  public async save() {
    const product = await this.storage.save({
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
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

  public async buy() {
    const products = await this.storage.buyProducts(this.listOfProducts!);
    return products;
  }
}
