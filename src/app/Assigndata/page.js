"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  Fade,
  Slide,
} from "@mui/material";
import {
  Email,
  Search,
  Business,
  Person,
  LocationOn,
  FilterList,
  DataUsage,
  SendRounded,
} from "@mui/icons-material";
import axios from "axios";

export default function AssignDataForm() {
  const [formData, setFormData] = useState({
    email: "",
    filters: {
      subCategoryId: "",
      search: "",
      country: "",
      industry: "",
      title: "",
      minEmployeeSize: "",
      maxEmployeeSize: "",
      firstName: "",
      lastName: "",
    },
    limit: 50,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // ✅ Handle field changes
  const handleChange = (e, field, nested = false) => {
    const { value } = e.target;
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        filters: { ...prev.filters, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/assign-data-from-website-purchase",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccessMessage(
        `✅ Data fetched successfully! Found ${response.data?.assignedItems?.length || 0} records.`
      );
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(
        err.response?.data?.message ||
          `Failed to fetch data (Status: ${err.response?.status || "Unknown"})`
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get appropriate icon for each field
  const getFieldIcon = (key) => {
    const iconMap = {
      email: <Email sx={{ color: "#1976d2" }} />,
      subCategoryId: <FilterList sx={{ color: "#7c4dff" }} />,
      search: <Search sx={{ color: "#ff9800" }} />,
      country: <LocationOn sx={{ color: "#4caf50" }} />,
      industry: <Business sx={{ color: "#e91e63" }} />,
      title: <DataUsage sx={{ color: "#00bcd4" }} />,
      firstName: <Person sx={{ color: "#795548" }} />,
      lastName: <Person sx={{ color: "#795548" }} />,
      minEmployeeSize: <Business sx={{ color: "#607d8b" }} />,
      maxEmployeeSize: <Business sx={{ color: "#607d8b" }} />,
    };
    return iconMap[key] || <DataUsage sx={{ color: "#9e9e9e" }} />;
  };

  // Helper function to format field labels
  const formatLabel = (key) => {
    const labelMap = {
      subCategoryId: "Sub Category ID",
      search: "Search Keywords",
      country: "Country",
      industry: "Industry",
      title: "Job Title",
      minEmployeeSize: "Minimum Employee Size",
      maxEmployeeSize: "Maximum Employee Size",
      firstName: "First Name",
      lastName: "Last Name",
    };
    return labelMap[key] || key.replace(/([A-Z])/g, " $1");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fff",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={800}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Header */}
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
                component="h4"
                sx={{
                  fontWeight: 500,
                  mb: 0,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Data Assignment Portal
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  opacity: 0.9,
                  fontSize: "0.8rem",
                }}
              >
                Configure your data filters and fetch targeted results
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {/* Error / Success Messages */}
              <Slide direction="down" in={!!error || !!successMessage}>
                <Box sx={{ mb: 3 }}>
                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        borderRadius: 2,
                        "& .MuiAlert-icon": { fontSize: "1.5rem" },
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert
                      severity="success"
                      sx={{
                        borderRadius: 2,
                        "& .MuiAlert-icon": { fontSize: "1.5rem" },
                      }}
                    >
                      {successMessage}
                    </Alert>
                  )}
                </Box>
              </Slide>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Contact Info + Data Limit Side by Side */}
                  <Grid container spacing={3}>
                    {/* Contact Information */}
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          height: "75%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background:
                            "#ffffffff",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0 }}>
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
                          value={formData.email}
                          onChange={(e) => handleChange(e, "email")}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email sx={{ color: "#1976d2" }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "white",
                              "&:hover fieldset": {
                                borderColor: "#1976d2",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                              },
                            },
                          }}
                        />
                      </Paper>
                    </Grid>

                    {/* Data Limit */}
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          height: "75%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background:
                            "#ffffffff",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <DataUsage sx={{ color: "#00695c", mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Data Limit
                          </Typography>
                        </Box>
                        <TextField
                          label="Maximum Records"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={formData.limit}
                          onChange={(e) => handleChange(e, "limit")}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <DataUsage sx={{ color: "#00695c" }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              backgroundColor: "white",
                              "&:hover fieldset": {
                                borderColor: "#00695c",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#00695c",
                              },
                            },
                          }}
                        />
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Filters Section */}
                  <Grid item xs={12}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        marginTop: 2,
                        borderRadius: 3,
                        background: "#fff",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <FilterList sx={{ color: "#f57c00", mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Search Filters
                        </Typography>
                        <Chip
                          label={`${
                            Object.values(formData.filters).filter((v) => v).length
                          } Active`}
                          size="small"
                          sx={{
                            ml: 2,
                            backgroundColor: "rgba(245,124,0,0.1)",
                            color: "#f57c00",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      <Grid container spacing={2}>
                        {Object.keys(formData.filters).map((key, index) => (
                          <Grid item xs={12} sm={6} md={4} key={key}>
                            <Fade in timeout={600 + index * 100}>
                              <TextField
                                label={formatLabel(key)}
                                variant="outlined"
                                fullWidth
                                value={formData.filters[key]}
                                onChange={(e) => handleChange(e, key, true)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {getFieldIcon(key)}
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    backgroundColor: "white",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.1)",
                                    },
                                    "&:hover fieldset": {
                                      borderColor: "#f57c00",
                                    },
                                    "&.Mui-focused": {
                                      transform: "translateY(-2px)",
                                      boxShadow:
                                        "0 4px 12px rgba(0,0,0,0.1)",
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor: "#f57c00",
                                    },
                                  },
                                }}
                              />
                            </Fade>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: "center", pt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <SendRounded />
                          )
                        }
                        sx={{
                          minWidth: 200,
                          py: 1.5,
                          px: 4,
                          borderRadius: 3,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          background: loading ? "#1976d2" : "#1976d2",
                          boxShadow: loading
                            ? "none"
                            : "0 8px 20px rgba(255,107,107,0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: loading ? "none" : "translateY(-2px)",
                            boxShadow: loading
                              ? "none"
                              : "0 12px 25px rgba(255,107,107,0.4)",
                          },
                          "&:active": {
                            transform: loading ? "none" : "translateY(0px)",
                          },
                        }}
                      >
                        {loading ? "Processing..." : "Fetch Data"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
}
