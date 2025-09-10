import React from "react";
import {
  Card,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchBar({ search, onSearchChange }) {
  return (
    <Card elevation={1} sx={{ mb: 3, p: 2 }}>
      <TextField
        fullWidth
        placeholder="Search companies, contacts, industries..."
        variant="outlined"
        value={search}
        onChange={onSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Card>
  );
}
