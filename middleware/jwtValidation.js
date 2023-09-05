const Jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/server.config");

exports.jwtValidation = async (req, res, next) => {
  try {
    let token = req.headers.jwt;

    if (!token || token.length < 10) {
      return res.status(300).send("Token is invalid");
    }
    let decoded = await Jwt.verify(token, SECRET_KEY);
    if (!decoded) return res.status(400).send("Token is not valid");
    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};
