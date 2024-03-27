export declare namespace ProductModule {
  interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  interface ProductsRepository {
    public save(
      input: Partial<ProductModule.Product>
    ): Promise<ProductModule.Product | null>;
    // public find(id: string): Promise<ProductModule.Product>;
  }
}
