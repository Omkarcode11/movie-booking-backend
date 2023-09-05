const { isValidPassword } = require("../utils/isString");

exports.loginValidation = (req, res, next) => {
  try {
    let body = req.body;
    //body will be {cred : 'email/phone' , password :'w3342sdf'}

    if (isNaN(body.cred)) {
      body.type = "email";
    } else {
      body.type = "phone";
    }

    if (!isValidPassword(body.password)) {
      return res.status(300).send("Password is incorrect");
    }

    next();
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};
