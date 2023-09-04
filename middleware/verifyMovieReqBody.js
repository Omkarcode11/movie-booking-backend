exports.verifyMoviesReqBody = (req, res, next) => {
  let body = req.body;
  for (const key in body) {
    if (key == "casts" || key == "language") {
      if (body[key].length == 0) {
        return res.status(300).send(`Enter at least one ${key}`);
      }
    } else if (!body[key] || body[key].length < 3) {
      return res
        .status(300)
        .send(`your ${key} length should be greater than 3`);
    }
  }
  next();
};
