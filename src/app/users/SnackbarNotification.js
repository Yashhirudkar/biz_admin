"use client";

import React from "react";
import { Snackbar } from "@mui/material";

export default function SnackbarNotification({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
}
