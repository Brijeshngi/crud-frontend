import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const API_URL = "https://node-crud-1-t94y.onrender.com/api/products";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  const openEditModal = (product) => {
    setEditProduct({ ...product });
  };

  const closeEditModal = () => {
    setEditProduct(null);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editProduct._id}`, editProduct);
      closeEditModal();
      fetchProducts();
    } catch (error) {
      alert("Error updating product");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Product Inventory
      </Typography>

      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Purchase Rate</TableCell>
              <TableCell>Sale Rate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <TableRow key={prod._id}>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>
                    {new Date(prod.expiry).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{prod.purchaseRate}</TableCell>
                  <TableCell>{prod.saleRate}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => openEditModal(prod)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteProduct(prod._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching products.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editProduct} onClose={closeEditModal}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={editProduct?.name || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            value={editProduct?.quantity || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Expiry Date"
            name="expiry"
            type="date"
            value={editProduct?.expiry?.substring(0, 10) || ""}
            onChange={handleEditChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Purchase Rate"
            name="purchaseRate"
            type="number"
            value={editProduct?.purchaseRate || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Sale Rate"
            name="saleRate"
            type="number"
            value={editProduct?.saleRate || ""}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductTable;
