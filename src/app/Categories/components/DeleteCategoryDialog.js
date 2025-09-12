import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteCategoryDialog = ({ deleteDialog, setDeleteDialog, handleDeleteCategory, deleting }) => {
  return (
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
        <Button onClick={handleDeleteCategory} color="error" variant="contained" disabled={deleting}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
