import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface ProductsTypeProps {
  type: string;
  checked: boolean;
  disabled: boolean;
}

const CheckboxType: React.FC<ProductsTypeProps> = ({
  type,
  checked,
  disabled,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} disabled={disabled} />}
        label={type}
      />
    </FormGroup>
  );
};

export default CheckboxType;
