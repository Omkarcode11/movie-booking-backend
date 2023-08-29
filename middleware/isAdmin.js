const User = require("../models/User");
const { userType } = require("../utils/constants");

exports.isAdmin = async (req, res, next) => {
  let admin = await User.findById(req.id);

  if (!admin) return res.status(300).send("Admin Not found");

  if (admin.userType != userType.Admin) {
    return res.status(400).send("This user is not Admin");
  }

  next();
};
