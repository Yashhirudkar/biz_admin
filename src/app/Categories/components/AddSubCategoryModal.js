import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddSubCategoryModal = ({ open, onClose, onSubmit, loading, categories }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;
    onSubmit({ name: name.trim(), categoryId: Number(categoryId) });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-subcategory-modal-title"
      aria-describedby="add-subcategory-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="add-subcategory-modal-title" variant="h6" component="h2" gutterBottom>
          Add New Sub Category
        </Typography>
        <TextField
          label="Sub Category Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <FormControl fullWidth margin="normal" disabled={loading} required>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} disabled={loading} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Sub Category"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSubCategoryModal;
