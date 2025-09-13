import React from "react";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        p: 1,
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          mb: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Data Assignment Portal
      </Typography>
      <Typography variant="h2" sx={{ opacity: 0.9, fontSize: "0.8rem" }}>
        Configure your data filters and fetch targeted results
      </Typography>
    </Box>
  );
}
