"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../../redux/userSlice";
import UserTable from "./UserTable";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import SnackbarNotification from "./SnackbarNotification";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    dispatch(updateUser({ id: selectedUser.id, name: editForm.name, email: editForm.email }));
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(deleteUser(selectedUser.id)).unwrap();
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <UserTable
        users={users}
        loading={loading}
        error={error}
        onRefresh={() => dispatch(fetchUsers())}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <EditUserDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        form={editForm}
        onFormChange={setEditForm}
        onSubmit={handleEditSubmit}
      />
      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        user={selectedUser}
      />
      <SnackbarNotification
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="User deleted successfully"
      />
    </>
  );
}
