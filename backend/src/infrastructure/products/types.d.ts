import { Document, ObjectId, Types } from 'mongoose';

export declare namespace ProductModule {
  interface Product {
    _id?: any;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    type?: string;
  }

  interface ListOfProducts {
    _id: string;
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

    public findProductsToBuy(
      listOfProducts: ListOfProducts[]
    ): Promise<ProductModule.Product[]>;

    public substractProductsToBuy(
      listOfProducts: ProductModule.Product[] | undefined
    ): Promise<ProductModule.Product[]>;

    public findProductsByType(type: string): Promise<ProductModule.Product[]>;
  }
}
