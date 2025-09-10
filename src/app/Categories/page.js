"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Skeleton,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";

export default function Settings() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, category: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/getCategories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      showSnackbar("Error fetching categories: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      showSnackbar("Category name is required", "error");
      return;
    }

    try {
      setAdding(true);
      const res = await fetch("http://localhost:5000/api/addCategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      setNewCategory("");
      showSnackbar("Category added successfully", "success");
      await fetchCategories(); // refresh table
    } catch (err) {
      showSnackbar(err.message, "error");
    } finally {
      setAdding(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/categories/${deleteDialog.category.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");

      showSnackbar("Category deleted successfully", "success");
      setDeleteDialog({ open: false, category: null });
      await fetchCategories(); // refresh table
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedCategories = categories.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Typography color="error" variant="h5" gutterBottom>
              Error Loading Categories
            </Typography>
            <Typography color="textSecondary" paragraph>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={fetchCategories}
              startIcon={<RefreshIcon />}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Category Management
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Add New Category
        </Typography>
        <Box component="form" onSubmit={handleAddCategory} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            label="Category Name"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ flexGrow: 1 }}
            disabled={adding}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={adding || !newCategory.trim()}
            startIcon={<AddIcon />}
            sx={{ minWidth: 140 }}
          >
            {adding ? "Adding..." : "Add Category"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ width: "100%" }}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">
            Existing Categories
          </Typography>
          <Button 
            onClick={fetchCategories} 
            startIcon={<RefreshIcon />}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                // Loading skeletons
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                  </TableRow>
                ))
              ) : sortedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="textSecondary">
                      No categories found. Add your first category above.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                sortedCategories.map((cat) => (
                  <TableRow key={cat.id} hover>
                    <TableCell>{cat.id}</TableCell>
                    <TableCell>
                      <Chip label={cat.name} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{new Date(cat.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{new Date(cat.updatedAt).toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="error" 
                        onClick={() => setDeleteDialog({ open: true, category: cat })}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, category: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the category "{deleteDialog.category?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, category: null })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}