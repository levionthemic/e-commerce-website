// const { cookies } = require("../../../../helpers/cookies");
// const User = require("../../models/user.model");

// module.exports.requireAuth = async (req, res, next) => {
//   const token = cookies(req).token;

//   const user = await User.findOne({
//     token: token,
//   }).select("-password -token");

//   if (!user) {
//     res.json({
//       code: 400,
//       message: "Invalid Token",
//     });
//     return;
//   }

//   next();
// };
const { cookies } = require("../../../../helpers/cookies");
const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  // Lấy token từ cookie (hoặc header nếu cần)
  const token = cookies(req).token;

  // Nếu không có token, bỏ qua xác thực và tiếp tục xử lý request
  if (!token) {
    console.log('No token found, skipping authentication');
    return next();  // Không cần xác thực, cho phép tiếp tục
  }

  try {
    const user = await User.findOne({ token: token }).select("-password -token");

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Token",
      });
    }

    req.user = user;  // Lưu thông tin người dùng vào req.user
    next();  // Tiếp tục xử lý request
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Server Error",
      error: error.message,
    });
  }
};
