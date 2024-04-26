import { Product } from '../../types/types';
import './cart-overlay.css';

interface SelectedProductProps {
  cart: Product[];
  isCartOpen: boolean;
  setIsCartOpen: any;
}

const CartOverlay: React.FC<SelectedProductProps> = ({
  cart,
  isCartOpen,
  setIsCartOpen,
}) => {
  const buyProducts = () => {
    console.log('PENDING TO BUILD');
    console.log(cart);
  };

  return (
    isCartOpen && (
      <div className="cart-overlay">
        {cart.map((product, index) => (
          <div key={index} className="cart-selected-product">
            <h3>{product.name}</h3>
            <img src={product.image}></img>
            <h3>{product.price} per unit</h3>
            <h4>{product.quantity}</h4>
          </div>
        ))}
        <button onClick={() => buyProducts()}>Buy Products</button>
        <button onClick={() => setIsCartOpen(false)}>Close</button>
      </div>
    )
  );
};

export default CartOverlay;
