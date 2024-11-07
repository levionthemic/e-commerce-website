const Cart = require("../../models/cart.model");

module.exports.requireCart = async (req, res, next) => {
  const cookies = req.headers.cookie.split("; ");
  let cartIdExist = false;
  for (const cookie of cookies) {
    const key = cookie.split("=")[0];
    if (key === 'cartId') {
      cartIdExist = true;
      break;
    }
  }
  if (!cartIdExist)  {
    const cart = new Cart();
    await cart.save();

    const expiresTime = 1000 * 60 * 60 * 24 * 365;

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime),
    });
  }

  next();
}