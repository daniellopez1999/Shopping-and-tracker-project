import React, { useState } from 'react';
import { AddressData, Product, SubmitOrderData } from '../../types/types';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  validateAddressData,
  validateSubmitOrder,
} from '../../utils/validators';

import { createOrder } from '../../utils/fetch';

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const products: Product[] = location.state;
  const [addressData, setAddressData] = useState<AddressData>({
    city: '',
    country: '',
    zip_code: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const savedUserID = Cookies.get('user_id')!;
    const savedEmail = Cookies.get('email')!;

    const isSubmitValid = validateSubmitOrder({
      products,
      user_email: savedUserID,
      user_id: savedEmail,
      address: addressData,
    });

    if (!isSubmitValid) {
      window.alert('Submit is not valid');
      return;
    }

    const isAddressDataCorrect = validateAddressData(addressData);

    if (!isAddressDataCorrect) {
      window.alert('Address Data is not valid');
      return;
    }

    const productsAndUser: SubmitOrderData = {
      products,
      user_id: savedUserID,
      user_email: savedEmail,
      address: addressData,
    };

    const order = await createOrder(productsAndUser);

    if (order.status === 200) {
      window.alert(order.message);
      navigate('/');
      return;
    } else {
      window.alert(order.message);
      return;
    }
  };

  return (
    <div>
      <div>
        {products.map((product, index) => (
          <div key={index} className="cart-selected-product">
            <h3>{product.name}</h3>
            <img src={product.image}></img>
            <h3>{product.price} per unit</h3>
            <h4>{product.quantity}</h4>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {' '}
        <label>Country</label>
        <input
          type="text"
          value={addressData!.country}
          onChange={(e) =>
            setAddressData((prevAddressData) => ({
              ...prevAddressData!,
              country: e.target.value,
            }))
          }
        ></input>
        <label>City</label>
        <input
          type="text"
          value={addressData!.city}
          onChange={(e) =>
            setAddressData((prevAddressData) => ({
              ...prevAddressData!,
              city: e.target.value,
            }))
          }
        ></input>
        <label>Zipcode</label>
        <input
          type="text"
          value={addressData!.zip_code}
          onChange={(e) =>
            setAddressData((prevAddressData) => ({
              ...prevAddressData!,
              zip_code: e.target.value,
            }))
          }
        ></input>
        <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default Checkout;
