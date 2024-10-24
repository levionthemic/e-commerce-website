const User = require("../../models/user.model");
const md5 = require("md5");

// [POST] /api/v1/user/signin
module.exports.signin = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);

  const user = new User({
    username: username,
    password: md5(password),
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

  console.log(username, password);

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

  if (md5(password) !== user.password) {
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
