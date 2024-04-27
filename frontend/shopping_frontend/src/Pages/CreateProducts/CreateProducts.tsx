import { ChangeEvent, useEffect, useState } from 'react';
import InputFileUpload from '../../Components/FileUpload/FileUpload';
import { sendProductsAsBulk } from '../../utils/fetch';
import SendButton from '../../Components/SendButton/SendButton';
import { Product } from '../../types/types';

const CreateProducts = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const createproduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Create product
  };

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
          <option value="Snack">Snack</option>
          <option value="Food">Food</option>
        </select>

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
