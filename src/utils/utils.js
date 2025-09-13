import React from "react";
import { Email, FilterList, Search, LocationOn, Business, DataUsage, Person } from "@mui/icons-material";

export function getFieldIcon(key) {
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
}

export function formatLabel(key) {
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
}
