const mongoose = require("mongoose");
const { generateTokenString } = require("../../../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    nickname: {
      type: String,
      default: "",
    },
    avatar: String,
    username: String,
    password: String,
    role: String,
    email: String,
    phoneNumber: String,
    birthday: String,
    sex: String,
    nationality: String,
    address: String,
    token: {
      type: String,
      default: generateTokenString(20),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
