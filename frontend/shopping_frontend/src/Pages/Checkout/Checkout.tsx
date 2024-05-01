import React from 'react';
import { Product } from '../../types/types';
import { useLocation } from 'react-router-dom';

const Checkout: React.FC = () => {
  const location = useLocation();
  const products: Product[] = location.state;
  return (
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
  );
};

export default Checkout;
