import { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { getAllProducts } from '../../utils/fetch';
import ProductCard from '../../Components/Card/ProductCard';
import './products.css';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (!loading && products.length === 0) return <p>No products found</p>;

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <div key={index}>
          <ProductCard
            id={product._id}
            name={product.name}
            description={product.description}
            image={product.image}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
