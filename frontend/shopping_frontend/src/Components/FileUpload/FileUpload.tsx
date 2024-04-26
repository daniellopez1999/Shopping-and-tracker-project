import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  setSelectedFile: any;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({
  setSelectedFile,
}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload CSV file
      <VisuallyHiddenInput
        type="file"
        accept=".csv"
        onChange={(e) => setSelectedFile(e.target.files![0])}
      />
    </Button>
  );
};

export default InputFileUpload;
