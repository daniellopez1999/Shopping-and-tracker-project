export interface SubmitOrderData {
  products: Product[];
  user_id: string;
  user_email: string;
  address: Address;
}

export interface Product {
  _id: any;
  name: string;
  description: string;
  price: number;
  quantity: number;
  type: string;
  image: string;
  __v?: number;
}

export interface Address {
  country: string;
  city: string;
  zip_code: string;
}
