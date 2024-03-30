export declare namespace ProductModule {
  interface Product {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
  }

  interface ListOfProducts {
    id: string;
    quantity: number;
  }

  interface ListOfProductsError {
    error: string;
    products: Product[];
  }

  interface ProductsRepository {
    public save(
      input: Partial<ProductModule.Product>
    ): Promise<ProductModule.Product | null>;
    public findById(id: string): Promise<ProductModule.Product | null>;
    public getAllProducts(): Promise<ProductModule.Product[]>;
    public buyProducts(
      listOfProducts: ListOfProducts[]
    ): Promise<ProductModule.Product[] | ListOfProductsError>;
  }
}
