// src/App.jsx
import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import CustomThemeProvider, { ColorModeContext } from "./ThemeContext";
import LoginForm from "./components/LoginForm";

function AppContent() {
  const [refresh, setRefresh] = React.useState(false);
  const colorMode = useContext(ColorModeContext);
  const mode = localStorage.getItem("mui-mode") || "light";

  useEffect(() => {
    localStorage.setItem("mui-mode", mode);
  }, [mode]);

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Inventory
          </Typography>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>
        <ProductForm onProductAdded={() => setRefresh(!refresh)} />
        <ProductTable key={refresh} />
      </Container>
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  const handleLogin = () => setIsLoggedIn(true);

  return (
    <CustomThemeProvider>
      {isLoggedIn ? <AppContent /> : <LoginForm onLogin={handleLogin} />}
    </CustomThemeProvider>
  );
}

export default App;
