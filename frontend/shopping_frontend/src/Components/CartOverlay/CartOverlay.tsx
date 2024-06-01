import Link from '@mui/material/Link';
import { Product } from '../../types/types';
import './cart-overlay.css';
import ButtonReference from '../ButtonReference/ButtonReference';
import { checkIfUserIsLogged } from '../../utils/checkers';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
  const navigate = useNavigate();

  const checkUserLogin = () => {
    const savedUserID = Cookies.get('user_id')!;
    const savedEmail = Cookies.get('email')!;
    const savedUsername = Cookies.get('username')!;

    const isUserLoggedIn = checkIfUserIsLogged({
      user_id: savedUserID,
      email: savedEmail,
      username: savedUsername,
    });

    if (!isUserLoggedIn) {
      window.alert('Please, log in before trying to do the checkout.');
      navigate('/sign-in');
      return;
    }
    navigate('/checkout', { state: cart });
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
        <button onClick={() => checkUserLogin()}>Cart</button>
        <ButtonReference
          text="Buy Products"
          reference="/checkout"
          props={cart}
        />
        <button onClick={() => setIsCartOpen(false)}>Close</button>
      </div>
    )
  );
};

export default CartOverlay;
