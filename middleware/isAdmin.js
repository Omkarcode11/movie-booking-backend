const User = require("../models/User");
const { userType } = require("../utils/constants");

exports.isAdmin = async (req, res, next) => {
  try {
    
    let admin = await User.findById(req.userId);
    
    if (!admin) return res.status(300).send("Admin Not found");

  if (admin.userType != userType.Admin) {
    return res.status(400).send("This user is not Admin");
  }
  
  next();
} catch (error) {
   return res.status(500).send("Internal Error") 
}
};
