import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Async thunk to fetch data
export const fetchData = createAsyncThunk(
  'uploaddata/fetchData',
  async ({ search = "", page = 1 }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { name, email, password } = state.login;

      const response = await axios.post(`${API_URL}/data`, {
        name,
        email,
        password,
        search,
        page,
      }, { withCredentials: true });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch data"
      );
    }
  }
);

// Async thunk to upload CSV
export const uploadCsv = createAsyncThunk(
  'uploaddata/uploadCsv',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/upload-csv2`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Upload failed"
      );
    }
  }
);

const uploaddataSlice = createSlice({
  name: 'uploaddata',
  initialState: {
    data: [],
    loading: false,
    error: null,
    uploading: false,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchData
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // uploadCsv
      .addCase(uploadCsv.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadCsv.fulfilled, (state) => {
        state.uploading = false;
        // You could refetch data or handle server response if needed
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default uploaddataSlice.reducer;
