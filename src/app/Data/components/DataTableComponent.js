import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

export default function DataTableComponent({ rows }) {
  return (
    <Card elevation={1}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "#1976d2",
                "& th": { color: "#fff", fontWeight: "600" }
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.companyName}</TableCell>
                <TableCell>
                  <Chip label={row.industry} size="small" variant="outlined" color="primary" />
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.companyPhone || "-"}</TableCell>
                <TableCell>{row.personLocation || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
