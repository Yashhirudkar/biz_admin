"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent
} from "@mui/material";
import {
  Refresh as RefreshIcon
} from "@mui/icons-material";

import { fetchCategories, addCategory, deleteCategory } from "../../redux/categoriesSlice";

import AddCategoryForm from "./components/AddCategoryForm";
import CategoriesTable from "./components/CategoriesTable";
import DeleteCategoryDialog from "./components/DeleteCategoryDialog";

export default function Settings() {
  const dispatch = useDispatch();
  const { categories, loading, error, adding, deleting } = useSelector((state) => state.categories);

  const [newCategory, setNewCategory] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, category: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchCategories());
  };

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      showSnackbar("Category name is required", "error");
      return;
    }

    try {
      const resultAction = await dispatch(addCategory(newCategory));
      if (addCategory.fulfilled.match(resultAction)) {
        setNewCategory("");
        showSnackbar("Category added successfully", "success");
      } else {
        showSnackbar(resultAction.payload || "Failed to add category", "error");
      }
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  // Delete category
  const handleDeleteCategory = async () => {
    try {
      const resultAction = await dispatch(deleteCategory(deleteDialog.category.id));
      if (deleteCategory.fulfilled.match(resultAction)) {
        showSnackbar("Category deleted successfully", "success");
        setDeleteDialog({ open: false, category: null });
      } else {
        showSnackbar(resultAction.payload || "Failed to delete category", "error");
      }
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
              onClick={handleRefresh}
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
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#1976d2">
        Category Management
      </Typography>
      
      <AddCategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        adding={adding}
      />

      <CategoriesTable
        categories={categories}
        loading={loading}
        order={order}
        orderBy={orderBy}
        handleSort={handleSort}
        setDeleteDialog={setDeleteDialog}
        handleRefresh={handleRefresh}
      />

      <DeleteCategoryDialog
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
        handleDeleteCategory={handleDeleteCategory}
        deleting={deleting}
      />

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