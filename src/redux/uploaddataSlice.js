import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../utils/api';

// Async thunk to fetch data
export const fetchData = createAsyncThunk(
  'uploaddata/fetchData',
  async ({ search = "", page = 1 }, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const { name, email, password } = state.login;
      const response = await apiFetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          search,
          page,
        }),
      }, dispatch);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to upload CSV
export const uploadCsv = createAsyncThunk(
  'uploaddata/uploadCsv',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiFetch("http://localhost:5000/api/upload-csv2", {
        method: "POST",
        body: formData,
      }, dispatch);
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON. Response: " + text);
      }
      if (!response.ok) {
        throw new Error(json.message || "Upload failed");
      }
      return json;
    } catch (error) {
      return rejectWithValue(error.message);
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
      .addCase(uploadCsv.fulfilled, (state, action) => {
        state.uploading = false;
        // Optionally, you can refetch data or update state based on response
      })
      .addCase(uploadCsv.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default uploaddataSlice.reducer;
