import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authService from '../services/authService.js';

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../features/auth/authSlice.js';



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setError('');

    dispatch(loginStart());

    const response =
      await authService.login(formData);

    console.log('LOGIN RESPONSE:', response);

    dispatch(
      loginSuccess({
        user: response.data.user,
        accessToken:
          response.data.accessToken,
      })
    );
    navigate('/dashboard');
  } catch (error) {
    console.error('LOGIN ERROR:', error);

    console.error(
      'BACKEND RESPONSE:',
      error.response?.data
    );

    dispatch(loginFailure());

    setError(
      error.response?.data?.message ||
        error.message ||
        'Login failed.'
    );
  }
};

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: '100%',
            p: 4,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                Welcome back
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Sign in to DevConnect AI.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Sign In
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;