export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  _id?: string;
  __v?: number;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
  phone_number: number;
}

export interface UserRegisterInput {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone_number: number;
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

export interface AddressData {
  country: string;
  city: string;
  zipcode: string;
}

export interface SubmitOrderData {
  products: Product[];
  savedUserID: string;
  savedEmail: string;
  addressData: AddressData;
}
