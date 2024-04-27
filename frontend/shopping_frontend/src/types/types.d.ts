export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  _id: string;
  __v: number;
}

export interface ProductsReponse {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  image: string;
  __v: number;
}

export interface errorRepeatedProducts {
  status: number;
  error: string;
  repeatedProducts: ProductsReponse[];
}

export interface errorRepeatedProductsResponse {
  Error: string;
  repeatedProducts: ProductsReponse[];
}

export interface errorUnknown {
  status: number;
  error: ReadableStream<Uint8Array>;
}
