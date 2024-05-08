import React, { useState } from 'react';
import { AddressData, Product } from '../../types/types';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  validateAddressData,
  validateSubmitOrder,
} from '../../utils/validators';

const Checkout: React.FC = () => {
  const location = useLocation();
  const products: Product[] = location.state;
  const [addressData, setAddressData] = useState<AddressData>({
    city: '',
    country: '',
    zipcode: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUserID = Cookies.get('user_id')!;
    const savedEmail = Cookies.get('email')!;

    const isSubmitValid = validateSubmitOrder({
      products,
      savedUserID,
      savedEmail,
      addressData,
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

    const productsAndUser = {
      products,
      user_id: savedUserID,
      user_email: savedEmail,
      address: addressData,
    };
    console.log(productsAndUser);
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
          type="number"
          value={addressData!.zipcode}
          onChange={(e) =>
            setAddressData((prevAddressData) => ({
              ...prevAddressData!,
              zipcode: Number(e.target.value),
            }))
          }
        ></input>
        <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default Checkout;
