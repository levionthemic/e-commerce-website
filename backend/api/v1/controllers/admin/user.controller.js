const User = require("../../models/user.model");

// [GET] /api/v1/admin/user
module.exports.index = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    message: "Success",
    data: users,
  });
};

// [GET] /api/v1/admin/user/get-info
module.exports.getInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({ token: token });
    res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

// [POST] /api/v1/admin/user/add
module.exports.add = async (req, res) => {
  const { ...userInfo } = req.body;
  const newUser = new User(userInfo);
  await newUser.save();
  res.status(200).json({
    message: "Success",
  });
};

// [PATCH] /api/v1/admin/user/edit
module.exports.edit = async (req, res) => {
  const { ...userInfo } = req.body;
  await User.updateOne(
    {
      token: userInfo.token,
    },
    userInfo
  );
  res.status(200).json({
    message: "Success",
  });
};

// [DELETE] /api/v1/admin/user/delete
module.exports.delete = (req, res) => {
  res.send("OK");
};
