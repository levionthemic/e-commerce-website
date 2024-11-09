import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice"; // Thêm cartReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer, // Thêm cart vào store
  },
});

export default store;
