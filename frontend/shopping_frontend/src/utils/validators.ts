import { Product, UserLogin } from '../types/types';

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

export const validateUserData = (user: UserLogin) => {
  if (!user.username || !user.password) {
    throw new Error('Username or Password missing');
  }
  return user;
};
