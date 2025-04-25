// src/components/LoginForm.jsx
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Simulated API call (replace with real one)
    if (username === "kms" && password === "152727") {
      localStorage.setItem("auth-token", "dummy-token");
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ my: 2 }}>
        Login
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};

export default LoginForm;
