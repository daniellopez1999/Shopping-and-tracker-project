import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

const buttons = [
  <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}>
    <Button key="sign-in" style={{ width: '100px' }}>
      Login
    </Button>
  </Link>,
  <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}>
    <Button key="sign-up" style={{ width: '100px' }}>
      Register
    </Button>
  </Link>,
];

export default function NavBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        size="medium"
        color={'inherit'}
        aria-label="Large button group"
        style={{ marginRight: '15px', marginTop: '15px' }}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
