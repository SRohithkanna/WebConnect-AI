import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authApi from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await authApi.post(
        "/auth/register",
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Registration response:", response.data);

      setSuccess(
        response.data?.message ||
          "Registration successful!"
      );

      // If your backend automatically logs the user in,
      // redirect to dashboard.
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Stack spacing={3}>
            {/* Header */}
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ mb: 1 }}
              >
                Create Account
              </Typography>

              <Typography color="text.secondary">
                Join DevConnect AI and connect with
                developers.
              </Typography>
            </Box>

            {/* Error */}
            {error && (
              <Alert severity="error">
                {error}
              </Alert>
            )}

            {/* Success */}
            {success && (
              <Alert severity="success">
                {success}
              </Alert>
            )}

            {/* Form */}
            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rohith Kanna"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="rohithkanna"
                  helperText="Letters, numbers and underscores only"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                    />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </Stack>
            </Box>

            {/* Login link */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                color="text.secondary"
                component="span"
              >
                Already have an account?{" "}
              </Typography>

              <Typography
                component={Link}
                to="/login"
                sx={{
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;