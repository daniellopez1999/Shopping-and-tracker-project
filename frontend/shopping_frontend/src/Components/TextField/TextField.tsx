import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface BasicTextFieldProps {
  type: 'password' | 'text' | 'email' | 'number';
  placeholder: string;
}

const BasicTextField: React.FC<BasicTextFieldProps> = ({
  type,
  placeholder,
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label={placeholder}
        variant="standard"
        type={type}
      />
    </Box>
  );
};

export default BasicTextField;
