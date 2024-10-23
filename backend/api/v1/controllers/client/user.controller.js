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
    message: "Success"
  })
};
