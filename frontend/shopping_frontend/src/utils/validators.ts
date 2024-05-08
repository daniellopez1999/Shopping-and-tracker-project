import {
  AddressData,
  Product,
  SubmitOrderData,
  UserLogin,
  UserRegisterInput,
} from '../types/types';

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

export const validatePasswords = (
  password: string,
  confirmPassword: string
): boolean => {
  if (password != confirmPassword) return false;
  return true;
};

export const validateUserRegister = (user: UserRegisterInput) => {
  if (
    user.username &&
    user.password &&
    user.confirmPassword &&
    user.email &&
    user.phone_number
  )
    return true;
  return false;
};

export const validatePasswordCharacter = (password: string): boolean => {
  const regexValidationCharacters = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (regexValidationCharacters.test(password)) return true;
  return false;
};

export const validateSubmitOrder = (orderData: SubmitOrderData): boolean => {
  if (
    !orderData.user_email ||
    !orderData.user_id ||
    !orderData.products ||
    !orderData.address
  )
    return false;
  return true;
};

export const validateAddressData = (addressData: AddressData) => {
  if (
    addressData.city == '' ||
    addressData.country == '' ||
    addressData.zip_code == ''
  )
    return false;
  return true;
};
