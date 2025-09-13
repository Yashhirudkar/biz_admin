import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { SendRounded } from "@mui/icons-material";

export default function SubmitButton({ loading }) {
  return (
    <Box sx={{ textAlign: "center", pt: 2 }}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : <SendRounded />
        }
        sx={{
          minWidth: 200,
          py: 1.5,
          px: 4,
          borderRadius: 3,
          fontSize: "1.1rem",
          fontWeight: 600,
          background: "#1976d2",
        }}
      >
        {loading ? "Processing..." : "Fetch Data"}
      </Button>
    </Box>
  );
}
