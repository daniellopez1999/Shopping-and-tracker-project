import { useEffect, useState } from 'react';
import InputFileUpload from '../../Components/FileUpload/FileUpload';

const CreateProducts = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const sendCSV = () => {};

  return (
    <div>
      <div>
        <InputFileUpload setSelectedFile={setSelectedFile} />
        <button onClick={sendCSV}>Send</button>
      </div>
    </div>
  );
};

export default CreateProducts;
