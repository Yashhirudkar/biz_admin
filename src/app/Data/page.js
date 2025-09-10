"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, alpha, useTheme } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DataTableComponent from "./components/DataTableComponent";
import PaginationComponent from "./components/PaginationComponent";
import UploadModal from "./components/UploadModal";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Modal state
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const theme = useTheme();

  // 📌 Fetch Data
  const fetchData = async (query = "", pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "yash1",
          email: "yashhirudkar@gmail.com",
          password: "123",
          search: query,
          page: pageNum,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();

      setRows(json.data || []);
      setTotalPages(json.totalPages || 1);
      setPage(json.currentPage || 1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(search, page);
  }, [page]);

  // Debounced search effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1); // reset to first page on new search
      fetchData(search, 1);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // 📌 Handle Upload
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
      setUploading(true);
      const res = await fetch("http://localhost:5000/api/upload-csv2", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON. Response: " + text);
      }

      if (!res.ok) throw new Error(json.message || "Upload failed");

      alert(`✅ ${json.message}, Inserted: ${json.inserted}`);
      setOpen(false);
      fetchData(search, page);
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setUploading(false);
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
      <DataTableComponent rows={rows} />
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
