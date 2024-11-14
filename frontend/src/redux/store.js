import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/cartSlice"; // Thêm cartReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer, // Thêm cart vào store
  },
});

export default store;
