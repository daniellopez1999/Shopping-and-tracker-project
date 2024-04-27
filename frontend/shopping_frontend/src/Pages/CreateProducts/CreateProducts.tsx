import { useEffect, useState } from 'react';
import InputFileUpload from '../../Components/FileUpload/FileUpload';
import { sendProductsAsBulk } from '../../utils/fetch';

const CreateProducts = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendCSV = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    } else window.alert('Products created');

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={sendCSV}>
        <InputFileUpload setSelectedFile={setSelectedFile} />
        {selectedFile ? <button>Send</button> : <button disabled>Send</button>}
      </form>
    </div>
  );
};

export default CreateProducts;
