import { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import './selected-product-overlay.css';

interface SelectedProductProps {
  selectedProduct: Product | null;
  setSelectedProduct: any;
  cart: Product[];
  setCart: any;
}

const SelectedProductOverlay: React.FC<SelectedProductProps> = ({
  selectedProduct,
  setSelectedProduct,
  cart,
  setCart,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target!.closest('.selected-product')
      ) {
        setQuantity(0);
        setSelectedProduct(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddProduct = () => {
    if (quantity == 0) {
      window.alert('To add a product quantity must be at least 1');
      return;
    }

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item._id === selectedProduct!._id
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      const product = { ...selectedProduct!, quantity: quantity };
      updatedCart.push(product);
    }
    setCart(updatedCart);
  };

  return (
    selectedProduct && (
      <div className="selected-product-overlay">
        <div className="selected-product">
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>Price: {selectedProduct.price}€</p>
          <div>
            <button
              onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}
            >
              -
            </button>
            <input type="number" value={quantity} readOnly></input>
            <button
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleAddProduct()}
            disabled={quantity === 0}
            style={{
              backgroundColor: quantity === 0 ? 'grey' : '',
              cursor: quantity === 0 ? 'not-allowed' : '',
            }}
          >
            Add to cart
          </button>
          <button onClick={() => setSelectedProduct(null)}>Close</button>
        </div>
      </div>
    )
  );
};

export default SelectedProductOverlay;
