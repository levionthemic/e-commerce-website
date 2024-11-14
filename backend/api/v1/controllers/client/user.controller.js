const User = require("../../models/user.model");
const Nation = require("../../models/nation.model");
const OTP = require("../../models/otp.model");
const Order = require("../../models/order.model");
const CryptoJS = require("crypto-js");
const { generateOTP } = require("../../../../helpers/generate");
const { sendMail } = require("../../../../helpers/sendMail");
const Cart = require("../../models/cart.model");

// [POST] /api/v1/user/signup
module.exports.signup = async (req, res) => {
  const { email, username, password, role } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (isUserExist) {
    res.status(400).json({
      message: "Error: Email or Username Existed",
    });
    return;
  }

  const user = new User({
    username: username,
    password: CryptoJS.SHA256(password).toString(),
    email: email,
    role: role,
  });
  await user.save();

  res.json({
    message: "Success",
  });
};

// [POST] /api/v1/user/login
module.exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    res.status(400).json({
      message: "Username không tồn tại!",
    });
    return;
  }

  if (CryptoJS.SHA256(password).toString() !== user.password) {
    res.status(400).json({
      message: "Mật khẩu không đúng!",
    });
    return;
  }

  if (role !== user.role) {
    res.status(400).json({
      message: "Tài khoản không tồn tại!",
    });
    return;
  }

  let cart = await Cart.findOne({ userId: user.id });
  if (!cart) {
    cart = new Cart({
      userId: user.id,
    });
    await cart.save();
  }

  res.status(200).json({
    message: "Login Success",
    token: user.token,
    cartId: cart.id,
  });
};

// [GET] /api/v1/user/nations
module.exports.getNations = async (req, res) => {
  const nations = await Nation.find({});
  res.status(200).json({
    message: "Success",
    data: nations,
  });
};

// [GET] /api/v1/user/:token
module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ token: req.params.token });
  res.status(200).json({
    message: "Success",
    user: user,
  });
};

// [PATCH] /api/v1/user/update
module.exports.update = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { ...userInfo } = req.body;
  try {
    await User.updateOne(
      {
        token: token,
      },
      { ...userInfo }
    );

    res.status(200).json({
      message: "Cập nhật thành công!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Cập nhật không thành công!",
    });
  }
};
// [POST] /api/v1/user/otp-request
module.exports.otpRequest = async (req, res) => {
  let { email, newEmail } = req.body;

  if (email) {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).json({
        message: "Email không tồn tại!",
      });
      return;
    }
  }

  if (newEmail) {
    email = newEmail;
  }

  const otp = new OTP({
    email: email,
    otp: generateOTP(6),
    expireAt: Date.now(),
  });
  await otp.save();

  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP xác minh lấy lại mật khẩu là <b>${otp.otp}</b>. Thời hạn sử dụng là 3 phút. Lưu y không được để lộ mã OTP.
  `;
  sendMail(email, subject, html);

  res.status(200).json({
    message: "Gửi OTP thành công",
  });
};

// [POST] /api/v1/user/otp-check
module.exports.otpCheck = async (req, res) => {
  const { otp } = req.body;

  const otpObj = await OTP.findOne({
    otp: otp,
  });
  if (!otpObj) {
    res.status(400).json({
      message:
        "Mã OTP sai hoặc hết hiệu lực. Vui lòng nhập lại OTP hoặc gửi lại mã!",
    });
    return;
  }
  const user = await User.findOne({
    email: otpObj.email,
  });
  res.status(200).json({
    message: "OTP hợp lệ",
    token: user ? user.token : "",
  });
};

// [POST] /api/v1/user/reset-password
module.exports.resetPassword = async (req, res) => {
  const { password, currentPassword } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  if (currentPassword) {
    const user = await User.findOne({ token: token });
    if (CryptoJS.SHA256(currentPassword).toString() !== user.password) {
      res.status(400).json({
        message: "Mật khẩu hiện tại không trùng khớp!",
      });
      return;
    }
    if (password === currentPassword) {
      res.status(400).json({
        message: "Mật khẩu mới không được giống mật khẩu hiện tại!",
      });
      return;
    }
  }
  try {
    await User.updateOne(
      {
        token: token,
      },
      { password: CryptoJS.SHA256(password).toString() }
    );
    res.status(200).json({
      message: currentPassword
        ? "Cập nhật mật khẩu thành công!"
        : "Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại để tiếp tục.",
    });
  } catch (error) {
    res.status(400).json({
      message: currentPassword
        ? "Cập nhật mật khẩu không thành công !"
        : "Đặt lại mật khẩu không thành công!",
    });
  }
};

// [GET] /api/v1/user/order
module.exports.order = async (req, res) => {
  const { status } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  const user = await User.findOne({ token: token });

  const orders = await Order.find({
    userId: user.id,
    status: status,
  });

  res.status(200).json({
    message: "Success",
    data: orders,
  });
};
