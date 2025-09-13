import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Chip,
  Fade,
  Autocomplete,
  IconButton,
} from "@mui/material";
import {
  FilterList,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { formatLabel } from "../../../utils/utils";

export default function FiltersSection({
  filters,
  onChange,
  categories,
  expandedCategories,
  toggleCategoryExpand,
  getSubCategoryOptions,
}) {
  const subCategoryOptions = getSubCategoryOptions();

  return (
    <Grid item xs={12}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <FilterList sx={{ color: "#f57c00", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Search Filters
          </Typography>
          <Chip
            label={`${Object.values(filters).filter((v) => v).length} Active`}
            size="small"
            sx={{
              ml: 2,
              backgroundColor: "rgba(245,124,0,0.1)",
              color: "#f57c00",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Filters */}
        <Grid container spacing={1}>
          {Object.keys(filters).map((key, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${key}-${index}`}>
              <Fade in timeout={600 + index * 100}>
                {key === "subCategoryId" ? (
                  <Autocomplete
                    fullWidth
                    sx={{
                      minWidth: "220px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#fafafa",
                      },
                    }}
                    options={subCategoryOptions}
                    groupBy={(option) => option.categoryName || "Others"}
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                    value={
                      subCategoryOptions.find(
                        (opt) => opt.id === filters.subCategoryId
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      onChange(
                        { target: { value: newValue ? newValue.id : "" } },
                        key,
                        true
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={formatLabel(key)}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    slotProps={{
                      paper: {
                        sx: {
                          borderRadius: 2,
                          mt: 1,
                          boxShadow:
                            "0px 4px 12px rgba(0,0,0,0.1), 0px 2px 6px rgba(0,0,0,0.08)",
                          border: "1px solid #eee",
                          maxHeight: 300,
                          overflowY: "auto",
                        },
                      },
                    }}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        key={`option-${option.id || option.name}`}
                        style={{
                                padding: "8px 14px",
                                borderRadius: "2px",
                                margin: "10px 6px",   // adds vertical space (top & bottom) and horizontal (left & right)
                                cursor: "pointer",
                                border: "1px solid #4d515127",
                                transition: "all 0.2s ease",
                                 boxShadow: "0 4px 12px rgba(110, 143, 147, 0.15)"

                                }}

                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        {option.name}
                      </li>
                    )}
                    renderGroup={(params) => {
                      const category = categories.find(
                        (cat) => cat.name === params.group
                      );
                      const uniqueKey = `group-${
                        category?.id || params.group
                      }-${index}`;
                      return (
                        <React.Fragment key={uniqueKey}>
                          <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                              px: 2,
                              py: 1,
                              backgroundColor: "#f0f0f0",
                              borderBottom: "1px solid #ddd",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategoryExpand(category?.id);
                              }}
                            >
                              {expandedCategories.has(category?.id) ? (
                                <KeyboardArrowUpIcon fontSize="small" />
                              ) : (
                                <KeyboardArrowDownIcon fontSize="small" />
                              )}
                            </IconButton>
                            <Typography
                              variant="subtitle2"
                              sx={{ ml: 1, fontWeight: 600 }}
                            >
                              {params.group}
                            </Typography>
                          </Box>
                          {expandedCategories.has(category?.id)
                            ? params.children
                            : null}
                        </React.Fragment>
                      );
                    }}
                  />
                ) : (
                  <TextField
                    label={formatLabel(key)}
                    variant="outlined"
                    fullWidth
                    value={filters[key]}
                    onChange={(e) => onChange(e, key, true)}
                  />
                )}
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}
