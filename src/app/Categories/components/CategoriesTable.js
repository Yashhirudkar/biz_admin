import React, { useState } from "react";
import {
  Box,
  Typography,
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
  Divider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

const CategoriesTable = ({
  categories,
  loading,
  order,
  orderBy,
  handleSort,
  setDeleteDialog,
  handleRefresh,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const sortedCategories = [...categories].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleToggleExpand = (categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">
          Existing Categories
        </Typography>
        <Button
          onClick={handleRefresh}
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
              <TableCell></TableCell>
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
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="circular" width={24} height={24} /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                </TableRow>
              ))
            ) : sortedCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="textSecondary">
                    No categories found. Add your first category above.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedCategories.map((cat) => (
                <React.Fragment key={cat.id}>
                  <TableRow hover>
                    <TableCell>
                      {cat.subcategories && cat.subcategories.length > 0 ? (
                        <IconButton
                          size="small"
                          onClick={() => handleToggleExpand(cat.id)}
                          aria-label={expandedCategories.has(cat.id) ? "collapse" : "expand"}
                        >
                          {expandedCategories.has(cat.id) ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      ) : null}
                    </TableCell>
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
                  {expandedCategories.has(cat.id) && cat.subcategories && cat.subcategories.length > 0 && (
                    cat.subcategories.map((subcat) => (
                      <TableRow key={subcat.id} hover>
                        <TableCell />
                        <TableCell>{subcat.id}</TableCell>
                        <TableCell sx={{ pl: 4 }}>
                          <Chip label={subcat.name || "(No Name)"} variant="outlined" />
                        </TableCell>
                        <TableCell>{new Date(subcat.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{new Date(subcat.updatedAt).toLocaleString()}</TableCell>
                        <TableCell />
                      </TableRow>
                    ))
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CategoriesTable;
