const User = require("../../models/user.model");
const Nation = require("../../models/nation.model");
const CryptoJS = require("crypto-js");

// [POST] /api/v1/user/signup
module.exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (isUserExist) {
    res.json({
      code: 400,
      message: "Error: Email or Username Existed",
    });
    return;
  }

  const user = new User({
    username: username,
    password: CryptoJS.SHA256(password).toString(),
    email: email,
  });
  await user.save();

  res.json({
    code: 200,
    message: "Success",
  });
};

// [POST] /api/v1/user/login
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Not Exist Username",
    });
    return;
  }

  if (CryptoJS.SHA256(password).toString() !== user.password) {
    res.json({
      code: 400,
      message: "Wrong Password",
    });
    return;
  }

  res.json({
    code: 200,
    message: "Login Success",
    token: user.token,
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

// [POST] /api/v1/user/update
module.exports.update = async (req, res) => {
  const { ...userInfo } = req.body;

  try {
    await User.updateOne(
      {
        token: userInfo.token,
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
