import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-categories`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch categories"
      );
    }
  }
);

// Async thunk to add a category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add-categories`, {
        name: categoryName,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add category"
      );
    }
  }
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/categories/${categoryId}`);
      return categoryId; // return id to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete category"
      );
    }
  }
);

// Async thunk to create a sub-category
export const createSubCategory = createAsyncThunk(
  'categories/createSubCategory',
  async ({ name, categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create-sub-category`, {
        name,
        categoryId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create sub-category"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    subcategories: [],
    loading: false,
    error: null,
    adding: false,
    deleting: false,
    addingSub: false,
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
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      })

      // createSubCategory
      .addCase(createSubCategory.pending, (state) => {
        state.addingSub = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.addingSub = false;
        state.subcategories.push(action.payload.subCategory);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.addingSub = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
