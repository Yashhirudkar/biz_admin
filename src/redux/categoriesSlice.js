import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../utils/api';

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiFetch("http://localhost:5000/api/get-categories", {}, dispatch);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryName, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiFetch("http://localhost:5000/api/add-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      }, dispatch);
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiFetch(`http://localhost:5000/api/categories/${categoryId}`, {
        method: "DELETE",
      }, dispatch);
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    adding: false,
    deleting: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addCategory
      .addCase(addCategory.pending, (state) => {
        state.adding = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.adding = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload;
      })
      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleting = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
