import {
  Product,
  ProductsReponse,
  errorRepeatedProducts,
  errorRepeatedProductsResponse,
  errorUnknown,
} from '../types/types';

export const getAllProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}products/all`);
  return res.json();
};

export const getAllTypes = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}products/all-products-type`
  );
  return res.json();
};

export const getProductsFilteredByType = async (selectedTypes: string[]) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }products/products-type?types=${encodeURIComponent(
      JSON.stringify(selectedTypes)
    )}`
  );
  return res.json();
};

export const getAllProductTypes = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}products/all-products-type`
  );
  return res.json();
};

export const createProduct = async (
  product: Product
): Promise<Product | { Message: string; Error: any }> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}products/create-product`,
    {
      method: 'POST',
      body: JSON.stringify(product),
    }
  );
  const response: Product = await res.json();
  if (res.status !== 200)
    return { Message: 'Could not create the product', Error: response };
  return response;
};

export const sendProductsAsBulk = async (
  csv: any
): Promise<Response | errorUnknown | errorRepeatedProducts> => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}products/bulk-products`,
      {
        method: 'POST',
        body: csv,
      }
    );

    if (!res.ok) {
      if (res.status === 409) {
        const response: errorRepeatedProductsResponse = await res.json();
        const error: errorRepeatedProducts = {
          status: res.status,
          error: response.Error,
          repeatedProducts: response.repeatedProducts,
        };
        return error;
      }

      if (res.status === 400) {
        const error: errorUnknown = {
          status: res.status,
          error: res.body!,
        };
        return error;
      }
    }

    const jsonRes: Response = await res.json();

    return jsonRes;
  } catch (error) {
    console.error('Error sending bulk products:', error);
    throw error;
  }
};
