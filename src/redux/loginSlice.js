import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Async thunk for login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Invalid credentials"
      );
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'login/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Logout failed"
      );
    }
  }
);

// Async thunk for register
export const registerUser = createAsyncThunk(
  'login/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, registerData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// Async thunk for loading user from localStorage
export const loadUser = createAsyncThunk(
  'login/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        return JSON.parse(storedUser);
      }
      return null;
    } catch {
      return rejectWithValue("Failed to load user");
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    name: '',
    email: '',
    password: '',
    errors: {},
    loading: false,
    user: null,
  },
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      if (state.errors[field]) {
        state.errors[field] = '';
      }
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    logout: (state) => {
      state.user = null;
      state.email = '';
      state.password = '';
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.email = '';
        state.password = '';
        localStorage.removeItem('user');
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errors = {};
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errors.general = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setField, setErrors, clearErrors, logout, updateUser } = loginSlice.actions;
export default loginSlice.reducer;
