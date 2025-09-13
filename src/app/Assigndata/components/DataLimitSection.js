import React from "react";
import { Grid, Paper, Box, Typography, TextField, InputAdornment } from "@mui/material";
import { DataUsage } from "@mui/icons-material";

export default function DataLimitSection({ limit, onChange }) {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <DataUsage sx={{ color: "#00695c", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Data Limit
          </Typography>
        </Box>
        <TextField
          label="Maximum Records"
          type="number"
          fullWidth
          value={limit}
          onChange={(e) => onChange(e, "limit")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DataUsage sx={{ color: "#00695c" }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Grid>
  );
}
