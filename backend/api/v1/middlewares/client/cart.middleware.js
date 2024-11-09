// const Cart = require("../../models/cart.model");
// const User = require("../../models/user.model");
// const { cookies } = require("../../../../helpers/cookies");

// module.exports.requireCart = async (req, res, next) => {
//   const cartId = cookies(req).cartId;
//   if (!cartId) {
//     const token = cookies(req).token;
//     const user = await User.findOne({ token: token });
//     const cart = new Cart({
//       userId: user.id,
//     });
//     await cart.save();

//     const expiresTime = 1000 * 60 * 60 * 24 * 365;

   
//     res.cookie("cartId", cart.id, {
//       expires: new Date(Date.now() + expiresTime),
//     });
//   }

//   next();
// };
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
const { cookies } = require("../../../../helpers/cookies");

module.exports.requireCart = async (req, res, next) => {
  const cartId = cookies(req).cartId;

  // Kiểm tra nếu không có cartId trong cookies
  if (!cartId) {
    const token = cookies(req).token;
    
    // Nếu không có token trong cookies, trả về lỗi hoặc bỏ qua
    if (!token) {
      console.log('No token found, skipping cart creation');
      return next();  // Không tạo cart nếu không có token
    }

    // Tìm người dùng theo token
    const user = await User.findOne({ token: token });

    // Nếu không tìm thấy user, trả về lỗi
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Token, User not found",
      });
    }

    // Tạo một cart mới cho người dùng
    const cart = new Cart({
      userId: user.id,
    });

    // Lưu cart vào cơ sở dữ liệu
    await cart.save();

    // Đặt cookie với cartId
    const expiresTime = 1000 * 60 * 60 * 24 * 365; // Thời gian hết hạn cookie là 1 năm

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime),
    });
  }

  // Tiếp tục xử lý middleware
  next();
};
