import React from "react";
import {
  Stack,
  Pagination,
} from "@mui/material";

export default function PaginationComponent({ totalPages, page, onPageChange }) {
  return (
    <Stack spacing={2} sx={{ p: 2, alignItems: "center" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
