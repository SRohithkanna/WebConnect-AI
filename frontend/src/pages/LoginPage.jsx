import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService.js";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice.js";

import apiClient from "../api/axios.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      dispatch(loginStart());

      // ------------------------------------------------
      // 1. Login
      // ------------------------------------------------

      const response = await authService.login(formData);

      console.log("LOGIN RESPONSE:", response);

      const user = response.data.user;

      const accessToken = response.data.accessToken;

      // ------------------------------------------------
      // 2. Store authentication information
      // ------------------------------------------------

      dispatch(
        loginSuccess({
          user,
          accessToken,
        }),
      );

      // ------------------------------------------------
      // 3. Fetch latest profile
      // ------------------------------------------------

      const profileResponse = await apiClient.get("/profile/me");

      const profile = profileResponse.data?.data || profileResponse.data;

      console.log("PROFILE AFTER LOGIN:", profile);

      // ------------------------------------------------
      // 4. Use backend profile completion
      // ------------------------------------------------

      const profileCompletion = profile?.profileCompletion || 0;

      console.log("PROFILE COMPLETION:", profileCompletion);

      // ------------------------------------------------
      // 5. Redirect based on backend value
      // ------------------------------------------------

      if (profileCompletion < 100) {
        navigate("/profile", {
          replace: true,
        });

        return;
      }

      // ------------------------------------------------
      // 6. Profile complete → Dashboard
      // ------------------------------------------------

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      console.error("BACKEND RESPONSE:", error.response?.data);

      dispatch(loginFailure());

      setError(
        error.response?.data?.message || error.message || "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            p: 4,
          }}
        >
          <Stack spacing={3}>
            {/* Header */}

            <Box>
              <Typography variant="h4" fontWeight={700}>
                Welcome back
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                Sign in to DevConnect AI.
              </Typography>
            </Box>

            {/* Error */}

            {error && <Alert severity="error">{error}</Alert>}

            {/* Login Form */}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
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
