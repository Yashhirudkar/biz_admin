import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import categoriesReducer from './categoriesSlice';
import uploaddataReducer from './uploaddataSlice';
import userReducer from './userSlice';


export const store = configureStore({
  reducer: {
    login: loginReducer,
    categories: categoriesReducer,
    uploaddata: uploaddataReducer,
    user: userReducer,
  },
});
