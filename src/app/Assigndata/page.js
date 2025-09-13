"use client";

import React from "react";
import {
  Box,
  Typography,
  Alert,
  Grid,
  Card,
  CardContent,
  Container,
  Fade,
  Slide,
} from "@mui/material";
import Header from "./components/Header";
import ContactInfoSection from "./components/ContactInfoSection";
import DataLimitSection from "./components/DataLimitSection";
import FiltersSection from "./components/FiltersSection";
import SubmitButton from "./components/SubmitButton";
import useAssignDataForm from "../../redux/useAssignDataForm";

export default function AssignDataForm() {
  const {
    formData,
    loading,
    error,
    successMessage,
    expandedCategories,
    categories,
    getSubCategoryOptions,
    handleChange,
    toggleCategoryExpand,
    handleSubmit,
  } = useAssignDataForm();

  return (
    <Box sx={{ minHeight: "100vh", background: "#fff", py: 4 }}>
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
            <Header />

            <CardContent sx={{ p: 4 }}>
              <Slide direction="down" in={!!error || !!successMessage}>
                <Box sx={{ mb: 3 }}>
                  {error && (
                    <Alert severity="error" sx={{ borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert severity="success" sx={{ borderRadius: 2 }}>
                      {successMessage}
                    </Alert>
                  )}
                </Box>
              </Slide>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid container spacing={3}>
                    <ContactInfoSection
                      email={formData.email}
                      onChange={handleChange}
                    />
                    <DataLimitSection
                      limit={formData.limit}
                      onChange={handleChange}
                    />
                  </Grid>

                  <FiltersSection
                    filters={formData.filters}
                    onChange={handleChange}
                    categories={categories}
                    expandedCategories={expandedCategories}
                    toggleCategoryExpand={toggleCategoryExpand}
                    getSubCategoryOptions={getSubCategoryOptions}
                  />

                  <Grid item xs={12}>
                    <SubmitButton loading={loading} />
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
