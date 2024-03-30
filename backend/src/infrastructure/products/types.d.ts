export declare namespace ProductModule {
  interface Product {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
  }
  interface ProductsRepository {
    public save(
      input: Partial<ProductModule.Product>
    ): Promise<ProductModule.Product | null>;
    public findById(id: string): Promise<ProductModule.Product | null>;
    public getAllProducts(): Promise<ProductModule.Product[]>;
  }
}
