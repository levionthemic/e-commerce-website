// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
