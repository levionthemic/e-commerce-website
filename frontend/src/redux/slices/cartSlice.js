import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // START: Dữ liệu mẫu cho giỏ hàng
    items: [
      {
        id: 1,
        name: "Giày Nike",
        price: 1000000,
        quantity: 2,
        totalPrice: 2000000,
        image: "/images/products/nike-shoe.jpg",
      },
      {
        id: 2,
        name: "Bàn phím cơ",
        price: 500000,
        quantity: 1,
        totalPrice: 500000,
        image: "/images/products/keyboard.jpg",
      },
      {
        id: 3,
        name: "Tai nghe Bluetooth",
        price: 300000,
        quantity: 3,
        totalPrice: 900000,
        image: "/images/products/headphone.jpg",
      },
      {
        id: 4,
        name: "Chuột không dây",
        price: 200000,
        quantity: 1,
        totalPrice: 200000,
        image: "/images/products/mouse.jpg",
      },
    ],
    totalQuantity: 7,
    totalAmount: 3600000,
    // END: Dữ liệu mẫu cho giỏ hàng
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      state.totalQuantity++;

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price,
        });
      }
      state.totalAmount += product.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalAmount += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalAmount -= item.price;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
