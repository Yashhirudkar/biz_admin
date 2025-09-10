import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  alpha,
  useTheme,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

export default function Header({ onUploadClick }) {
  const theme = useTheme();

  return (
    <Card
      elevation={2}
      sx={{
        mb: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`,
        color: "white",
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight="600">
            Company Directory
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Manage and explore company data
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={onUploadClick}
          startIcon={<CloudUpload />}
          sx={{
            backgroundColor: "white",
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: alpha("#fff", 0.9),
            },
          }}
        >
          Upload CSV
        </Button>
      </CardContent>
    </Card>
  );
}
