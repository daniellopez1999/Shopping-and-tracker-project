import { Product } from '../types/types';

export const validateProductData = (productData: Product): boolean => {
  if (
    !productData.name ||
    !productData.description ||
    !productData.price ||
    !productData.quantity ||
    !productData.type ||
    !productData.image
  )
    return false;
  else if (!Number.isInteger(productData.quantity)) return false;
  return true;
};
