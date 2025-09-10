"use client";

import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import EditUserDialog from "./EditUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import SnackbarNotification from "./SnackbarNotification";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    setError("");
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError(err.message || "Error fetching users");
        setUsers([]);
        setLoading(false);
      });
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              name: editForm.name,
              email: editForm.email,
              updatedAt: new Date().toISOString(),
            }
          : u
      )
    );
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
      const res = await fetch("http://localhost:5000/api/deteleUser", {
        method: "POST", // change to DELETE if your API expects it
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedUser.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      const result = await res.json();
      console.log("Delete response:", result);

      // Update UI after successful deletion
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.message || "Error deleting user");
    }
  };

  return (
    <>
      <UserTable
        users={users}
        loading={loading}
        error={error}
        onRefresh={fetchUsers}
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
