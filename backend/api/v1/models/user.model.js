const mongoose = require("mongoose");
const { generateTokenString } = require("../../../helpers/generate");

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    address: String,
    token: {
      type: String,
      default: generateTokenString(20),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
