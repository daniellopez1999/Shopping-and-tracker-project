import { ProductModule } from './types';

export class ProductClass implements ProductModule.Product {
  private readonly storage: ProductModule.ProductsRepository;

  public name!: string;
  public description!: string;
  public price!: number;
  public quantity!: number;

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
}
