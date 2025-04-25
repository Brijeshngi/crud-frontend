import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";

const API_URL = "https://node-crud-1-t94y.onrender.com/api/products";

const ProductForm = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    expiry: "",
    purchaseRate: "",
    saleRate: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, product);
      onProductAdded();
      setProduct({
        name: "",
        quantity: "",
        expiry: "",
        purchaseRate: "",
        saleRate: "",
      });
    } catch (err) {
      alert("Error adding product.");
    }
  };

  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              fullWidth
              required
              value={product.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiry Date"
              name="expiry"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              value={product.expiry}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Rate"
              name="purchaseRate"
              type="number"
              fullWidth
              required
              value={product.purchaseRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sale Rate"
              name="saleRate"
              type="number"
              fullWidth
              required
              value={product.saleRate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;
