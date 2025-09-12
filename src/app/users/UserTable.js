"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Alert,
  AppBar,
  Toolbar,
  alpha,
  styled,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Styled component for the table container
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  background: "white",
  overflowY: "auto",
  overflowX: "auto",
  maxHeight: "70vh",
  width: "100%",
  marginTop: theme.spacing(4),
  "& .MuiTableHead-root": {
    background: alpha(theme.palette.primary.main, 0.05),
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  },
}));

// Styled component for the table header cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.dark,
  fontSize: "0.9rem",
}));

// Styled component for the table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    transition: "background-color 0.2s ease",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Styled component for action buttons
const ActionButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

export default function UserTable({
  users,
  loading,
  error,
  onRefresh,
  onEdit,
  onDelete,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Box textAlign="center">
          <CircularProgress size={60} thickness={4} sx={{ mb: 2, color: "primary.main" }} />
          <Typography variant="h6" color="textSecondary">
            Loading users...
          </Typography>
        </Box>
      </Box>
    );
  }

  return ( 
    <Box sx={{ width: "95%", p: { xs: 1, sm: 2, md: 3 } ,overflowX: "auto"}}>

    <Typography
  variant="h6"
  component="div"
  sx={{
    color: '#1976d2',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 700,           // bold
    fontSize: '2.125rem',      // equivalent to your CSS
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
    marginBottom: '0.35em',
  }}
>
  User Management
</Typography>


      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {users.length === 0 && !loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
          flexDirection="column"
        >
          <PersonIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No users found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            There are no users to display at the moment.
          </Typography>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRefresh}>
            Try Again
          </Button>
        </Box>
      ) : (
        <StyledTableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 900, tableLayout: "auto" }}
            aria-label="user table"
          >
            <TableHead>
              <TableRow>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>User</StyledTableCell>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Email</StyledTableCell>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Status</StyledTableCell>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Created</StyledTableCell>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Last Updated</StyledTableCell>
  <StyledTableCell sx={{ backgroundColor: '#1976d2', color: 'white' }} align="center">Actions</StyledTableCell>
</TableRow>

            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography variant="subtitle2">{user.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label="Active" size="small" color="success" variant="outlined" />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <ActionButton
                        color="primary"
                        onClick={() => onEdit(user)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </ActionButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <ActionButton
                        color="error"
                        onClick={() => onDelete(user)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </ActionButton>
                    </Tooltip>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </Box>
  );
}
