// redux/slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(product => product.id !== action.payload.id);
    },
  },
});

// Xuất action creators và reducer
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
