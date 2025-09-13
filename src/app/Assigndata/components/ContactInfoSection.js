import React from "react";
import { Grid, Paper, Box, Typography, TextField, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";

export default function ContactInfoSection({ email, onChange }) {
  return (
    <Grid item xs={12} md={6}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Email sx={{ color: "#1976d2", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Contact Information
          </Typography>
        </Box>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => onChange(e, "email")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#1976d2" }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Grid>
  );
}
