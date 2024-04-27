import { useEffect, useState } from 'react';
import InputFileUpload from '../../Components/FileUpload/FileUpload';
import { sendProductsAsBulk } from '../../utils/fetch';
import SendButton from '../../Components/SendButton/SendButton';
import BasicTextField from '../../Components/TextField/TextField';

const CreateProducts = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

      <div>
        <h2>Create a product</h2>
        <BasicTextField type="text" placeholder="Name" />
        <BasicTextField type="text" placeholder="Description" />
        <BasicTextField type="number" placeholder="Price" />
        <BasicTextField type="number" placeholder="Quantity" />
        <BasicTextField type="text" placeholder="Url Image" />
        <BasicTextField type="text" placeholder="Type" />
      </div>
    </div>
  );
};

export default CreateProducts;
