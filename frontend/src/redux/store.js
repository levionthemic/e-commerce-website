// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import productReducer from './slices/ProductSlice';
import updatePasswordReducer from './slices/UpdatePasswordModalSlice';
import updateEmailReducer from './slices/UpdateEmailModalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    updatePasswordModal: updatePasswordReducer,
    updateEmailModal: updateEmailReducer
  },
});
