const mongoose = require("mongoose");
const { generateOrderId } = require("../../../helpers/generate");

const orderSchema = new mongoose.Schema({
  userId: String,
  orderId: {
    type: String,
    default: generateOrderId(15),
  },
  status: String,
  products: Array,
  sellerId: String,

});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
