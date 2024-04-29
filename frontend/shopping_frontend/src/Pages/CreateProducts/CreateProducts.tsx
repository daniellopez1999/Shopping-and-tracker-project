import { ChangeEvent, useEffect, useState } from 'react';
import InputFileUpload from '../../Components/FileUpload/FileUpload';
import {
  createProduct,
  getAllProductTypes,
  sendProductsAsBulk,
} from '../../utils/fetch';
import SendButton from '../../Components/SendButton/SendButton';
import { Product } from '../../types/types';
import { validateProductData } from '../../utils/validators';

const CreateProducts = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [didProductTypesLoad, setDidProductTypesLoad] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    image: '',
    type: '',
  });

  const sendCSV = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('csvFile', selectedFile!);
    const file = await sendProductsAsBulk(formData);
    if (file.status === 409 && 'repeatedProducts' in file) {
      const nameOfRepeatedProducts: string[] = [];
      file.repeatedProducts.map((product) =>
        nameOfRepeatedProducts.push(product.name)
      );
      window.alert(
        `The following products already exist: ${nameOfRepeatedProducts.join(
          ', '
        )}`
      );
    } else if (file.status === 400 && 'error' in file) {
      window.alert(file.error);
    } else window.alert('Products created');

    setLoading(false);
  };

  const createproduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //API Call Create Product
    const isProductDataValid = validateProductData(productData);

    if (!isProductDataValid) {
      console.log(productData);
      window.alert('Product Data is not valid');
      return;
    }

    //If price is written with comma, change to .
    if (productData.price.toString().includes(',')) {
      let priceAsString = productData.price.toString();
      priceAsString.replace(',', '.');
      productData.price = parseFloat(priceAsString);
    }

    const product = await createProduct(productData);

    if ('Error' in product) {
      window.alert(product.Message);
      return;
    }
    window.alert('Product created');
  };

  useEffect(() => {
    const fetchProductTypes = async () => {
      const allProductTypes = await getAllProductTypes();
      setProductTypes(allProductTypes);
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (productTypes) {
      setProductData((prevProductData) => ({
        ...prevProductData!,
        type: productTypes[0],
      }));
      setDidProductTypesLoad(true);
    }
  }, [productTypes]);

  return (
    <div>
      <div>
        <h2>BULK</h2>
        <div>
          <InputFileUpload setSelectedFile={setSelectedFile} />
          {selectedFile ? (
            <SendButton
              disabled={false}
              text="Send"
              onClick={() => sendCSV()}
            />
          ) : (
            <SendButton disabled={true} text="Send" />
          )}
        </div>
      </div>

      <form onSubmit={(e) => createproduct(e)}>
        <h2>Create a product</h2>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={productData.name}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              name: e.target.value,
            }))
          }
        />
        <label>Description</label>

        <input
          type="text"
          placeholder="Description"
          value={productData.description}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              description: e.target.value,
            }))
          }
        />
        <label>Price</label>

        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              price: e.target.valueAsNumber,
            }))
          }
        />
        <label>Quantity</label>

        <input
          type="number"
          placeholder="Quantity"
          value={productData.quantity}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              quantity: e.target.valueAsNumber,
            }))
          }
        />
        <label>Type</label>

        <select
          value={productData.type}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              type: e.target.value,
            }))
          }
        >
          {/* Fetch al Backend para recibir todos los posibles tipos */}
          {productTypes.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
        <label>Image URL</label>

        <input
          type="text"
          placeholder="Image URL"
          value={productData.image}
          onChange={(e) =>
            setProductData((prevProductData) => ({
              ...prevProductData!,
              image: e.target.value,
            }))
          }
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProducts;
