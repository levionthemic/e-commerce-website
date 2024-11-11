const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  orderId: String,
  status: String,
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  sellerId: String,
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
