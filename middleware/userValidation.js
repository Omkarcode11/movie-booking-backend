const {isString,isValidPassword, isValidEmail}= require('./../utils/isString')
const User = require("./../models/User");

exports.userValidate = async (req, res, next) => {
  try {
    
    let body = req.body;
    
    for (const key in body) {
      if (key == "phone") continue
      if (!isString(body[key])) {
      return res.status(400).send(`${key} is invalid`);
    }
  }

  let email = await User.findOne({ email: body.email });
  if (email) return res.status(400).send("Email is already present");
  
  let phone = await User.findOne({ phone: body.phone });
  if (phone) return res.status(400).send("Phone is already present");

  if (!isValidEmail(body.email) || !isValidPassword(body.password)) {
    return res.status(400).send("Password or Email is not valid")
  }

  next();
} catch (error) {
  return res.status(500).send("Internal Error") 
}
};

