const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/server.config");

exports.createUser = async (req, res) => {
  let body = req.body;

  try {
    body.password = await bcrypt.hash(body.password, 10);

    let User = await User.create(body);

    if (User) {
      return res.status(200).send("User created Successfully");
    } else {
      return res.status(400).send("User Not created Successfully");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.login = async (req, res) => {
  let body = req.body;
  let user;

  if (body.type == "email") {
    user = await User.findOne({ email: body.cred });
  } else {
    user = await User.findOne({ phone: body.phone });
  }

  if (user) {
    return res.status(404).send("User Not found");
  }

  let isMatch = await bcrypt.compare(body.password, user.password);

  if (!isMatch) return res.status(400).send("Password is Wrong Try again");

  let hashObj = {
    id: user._id,
    type: user.userType,
  };

  let token = jwt.sign(hashObj, SECRET_KEY, { expiresIn: "100000" });

  return res.send({
    token: token,
  });
};
