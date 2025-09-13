import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const AddCategoryForm = ({ newCategory, setNewCategory, handleAddCategory, adding, onOpenSubModal }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Add New Category
      </Typography>
      <Box component="form" onSubmit={handleAddCategory} sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
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
      <Button
        variant="outlined"
        onClick={onOpenSubModal}
        startIcon={<AddIcon />}
        sx={{ minWidth: 200 }}
      >
        Add New Sub Category
      </Button>
    </Paper>
  );
};

export default AddCategoryForm;
