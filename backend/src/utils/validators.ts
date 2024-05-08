import { SubmitOrderData } from './types';

export const validateCreateOrderData = (orderData: SubmitOrderData) => {
  if (
    !orderData.products ||
    !orderData.address.city ||
    !orderData.address.country ||
    !orderData.address.zip_code ||
    !orderData.user_email ||
    !orderData.user_id
  )
    return false;
  return true;
};
