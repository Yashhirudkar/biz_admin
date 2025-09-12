"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Box, Typography } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DataTableComponent from "./components/DataTableComponent";
import PaginationComponent from "./components/PaginationComponent";
import UploadModal from "./components/UploadModal";
import { fetchData, uploadCsv } from "../../redux/uploaddataSlice";

export default function DataTable() {
  const dispatch = useDispatch();
  const { data, loading, error, uploading, totalPages, currentPage } = useSelector(
    (state) => state.uploaddata
  );

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");

  // Search + Pagination
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  // Fetch data on page change
  React.useEffect(() => {
    dispatch(fetchData({ search, page }));
  }, [dispatch, page]);

  // Debounced search effect
  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1); // reset to first page on new search
      dispatch(fetchData({ search, page: 1 }));
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [dispatch, search]);

  // Handle upload
  const handleUpload = async () => {
    if (!file || !title || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", categoryId);

    try {
      const resultAction = await dispatch(uploadCsv(formData));
      if (uploadCsv.fulfilled.match(resultAction)) {
        alert(`✅ ${resultAction.payload.message}, Inserted: ${resultAction.payload.inserted}`);
        setOpen(false);
        dispatch(fetchData({ search, page }));
      } else {
        alert(`❌ ${resultAction.payload || "Upload failed"}`);
      }
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 1, maxWidth: 1400, margin: "0 auto" }}>
      <Header onUploadClick={() => setOpen(true)} />
      <SearchBar search={search} onSearchChange={(e) => setSearch(e.target.value)} />
      <DataTableComponent rows={data} />
      <PaginationComponent totalPages={totalPages} page={page} onPageChange={(e, value) => setPage(value)} />
      <UploadModal
        open={open}
        onClose={() => setOpen(false)}
        file={file}
        setFile={setFile}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        onUpload={handleUpload}
        uploading={uploading}
      />
    </Box>
  );
}
