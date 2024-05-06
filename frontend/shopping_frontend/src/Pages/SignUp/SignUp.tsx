import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserRegisterInput } from '../../types/types';
import { useState } from 'react';
import { register } from '../../utils/fetch';
import {
  validatePasswordCharacter,
  validatePasswords,
  validateUserRegister,
} from '../../utils/validators';

const defaultTheme = createTheme();

export default function SignUp() {
  const [user, setUser] = useState<UserRegisterInput>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const confirmPasswordsEqual = validatePasswords(
      user!.password!,
      user!.confirmPassword!
    );

    if (!confirmPasswordsEqual) {
      window.alert("Passwords doesn't match");
      return;
    }

    const passwordHasValidCharacters = validatePasswordCharacter(
      user!.password!
    );

    if (!passwordHasValidCharacters) {
      window.alert(
        'Password must have at least 8 characters, 1 Uppercase and a number'
      );
      return;
    }

    const isUserDataValid = validateUserRegister(user!);

    if (!isUserDataValid) {
      window.alert('All input fields must be completed');
      return;
    }

    const userRegister = await register(user!);

    if (userRegister.status === 200) window.alert(userRegister.message);
    if (userRegister.status !== 200) window.alert(userRegister.message);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              value={user?.username}
              autoComplete="username"
              autoFocus
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser!,
                  username: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user?.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser!,
                  password: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={user?.confirmPassword}
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="confirm-current-password"
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser!,
                  confirmPassword: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              name="email"
              type="email"
              value={user?.email}
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser!,
                  email: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Phone"
              label="Phone"
              name="phone_number"
              type="number"
              value={user?.phone_number}
              autoComplete="phone_number"
              autoFocus
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser!,
                  phone_number: Number(e.target.value),
                }))
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
