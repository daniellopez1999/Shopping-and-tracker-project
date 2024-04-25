import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ProductsTypeProps {
  type: string;
  checked: boolean;
}

const CheckboxType: React.FC<ProductsTypeProps> = ({ type, checked }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={checked} />} label={type} />
    </FormGroup>
  );
};

export default CheckboxType;
