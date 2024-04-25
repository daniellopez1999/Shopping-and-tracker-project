import { useEffect, useState } from 'react';
import { Product } from '../../types/types';
import {
  getAllProducts,
  getAllTypes,
  getProductsFilteredByType,
} from '../../utils/fetch';
import ProductCard from '../../Components/Card/ProductCard';
import './products.css';
import FilterProducts from '../../Components/FilterProducts/FilterProducts';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchAllProductTypes = async () => {
      try {
        const types = await getAllTypes();
        setTypes(types);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchProducts();
    fetchAllProductTypes();
    setLoading(false);
  }, []);

  const handleTypeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string
  ) => {
    e.preventDefault();

    if (selectedTypes.includes(type)) {
      const filteredTypes = selectedTypes.filter((t) => t !== type);
      setSelectedTypes(filteredTypes);
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const applyFilterType = async () => {
    if (selectedTypes.length === 0) {
      const products = await getAllProducts();
      setProducts(products);
      return;
    }

    const products = await getProductsFilteredByType(selectedTypes);
    setProducts(products);
  };

  if (loading) return <p>Loading products...</p>;
  if (!loading && products.length === 0) return <p>No products found</p>;

  return (
    <div className="products-page">
      <div className="filter-products">
        {types.map((type, index) => (
          <div key={index} onClick={(e) => handleTypeClick(e, type)}>
            <FilterProducts
              type={type}
              checked={selectedTypes.includes(type)}
            />
          </div>
        ))}
        <button onClick={applyFilterType}>Apply</button>
      </div>
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
    </div>
  );
};

export default Products;
