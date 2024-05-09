import {
  FetchResponse,
  Product,
  SubmitOrderData,
  UserLogin,
  UserRegister,
  errorRepeatedProducts,
  errorRepeatedProductsResponse,
  errorUnknown,
} from '../types/types';

export const getAllProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}products/all`);
  return res.json();
};

export const getDeliveredClientOrders = async (user_id: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }orders/delivered-user-orders/${user_id}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  return res.json();
};

export const getUndeliveredClientOrders = async (user_id: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_BACKEND_URL
    }orders/undelivered-user-orders/${user_id}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
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

export const login = async (
  user: UserLogin
): Promise<{ status: number; message: string }> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(user),
  });
  if (res.status === 200)
    return { status: res.status, message: 'Login successful' };
  else {
    const { message }: { message: string } = await res.json();
    const userError = { status: res.status, message: message };
    return userError;
  }
};

export const register = async (
  user: UserRegister
): Promise<{ status: number; message: string }> => {
  const userObject = {
    username: user.username,
    password: user.password,
    email: user.email,
    phone_number: user.phone_number,
  };
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
  });
  if (res.status === 200)
    return { status: res.status, message: 'Register successful' };
  else {
    const { message }: { message: string } = await res.json();
    const userError = { status: res.status, message: message };
    return userError;
  }
};

export const createProduct = async (
  product: Product
): Promise<Product | { Message: string; Error: any }> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}products/create-product`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }
  );
  const response = await res.json();
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
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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

export const createOrder = async (
  orderData: SubmitOrderData
): Promise<FetchResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}orders/create-order`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }
  );

  if (res.status === 401) {
    const err: FetchResponse = {
      status: res.status,
      message: 'Order could not be created due missing parameters',
    };
    return err;
  }

  if (res.status === 404) {
    const err: FetchResponse = {
      status: res.status,
      message: 'The store has not enough quantity of the selected products',
    };
    return err;
  }

  if (res.status === 400) {
    const err: FetchResponse = {
      status: res.status,
      message: 'Error creating order, please try again later',
    };
    return err;
  }

  if (res.status === 200) {
    const orderCreated: FetchResponse = {
      status: res.status,
      message: 'Order Created',
    };
    return orderCreated;
  }

  return Promise.reject({
    status: res.status,
    message: 'Unexpected error occurred while creating order',
  });
};

export const getUserRole = async (user_id: string): Promise<FetchResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}users/user-role/${user_id}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  if (res.status === 200) {
    const { role } = await res.json();
    const user: FetchResponse = {
      status: res.status,
      message: role,
    };
    return user;
  } else {
    const err: FetchResponse = {
      status: res.status,
      message: 'Could not get User Role',
    };
    return err;
  }
};
