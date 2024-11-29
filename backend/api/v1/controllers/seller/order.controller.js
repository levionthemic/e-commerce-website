const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const Category = require("../../models/category.model");
// [GET]/api/v1/seller/order
module.exports.index = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const seller = await User.findOne({token : token});
    // console.log(seller.id);
    const category = await Category.findOne({seller_id : seller.id});
    // console.log(category.id);
    const category_id = String(category.id);
    console.log(category_id);
    // Truy vấn tất cả đơn hàng từ MongoDB
    const orders = await Order.find({})
      .select("-_id userId orderId status products");
    let products = [];
    // console.log(orders);
    Promise.all(
      orders.map((order) => User.findOne({_id : order.userId}))
    ).then (users => {
      orders.forEach((order) => {
        // console.log(user);
        order.products.forEach(productInOrder => {
          const pathSegments = productInOrder._doc.primary_category_path.split("/");
          if (pathSegments[2] === category_id) {
            const user = users.find(user => user.id === order.userId);
            products.push({
              productName: productInOrder._doc.name,
              userName: user.fullname,
              quantity: productInOrder._doc.quantity,
              price: productInOrder._doc.price,
              status: order.status,
              orderId: order.orderId,
            });
          }
        });
      });
      res.status(200).json({
        message: "Success",
        orders: products,
      });
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
