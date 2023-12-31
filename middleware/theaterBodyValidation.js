const { default: mongoose } = require("mongoose");

exports.theaterBodyValidation = (req, res, next) => {
  try {
    let body = req.body;
    for (const key in body) {
      if (key == "movies") {
        if(body[key].length){
          for(let i = 0 ;i<body[key].length;i++){
            if(!mongoose.Types.ObjectId.isValid(body[key])){
                return res.status(400).send("Movies id is wrong")
            }
          }
        }
      }
      else if (key == "pinCode") {
        if (body[key] < 100000 && body[key] > 999999) {
          return res.status(400).send("pinCode is incorrect");
        }
      } else {
        if (!body[key] || body[key].length < 3) {
          return res.status(400).send(`your ${key} is incorrect`);
        }
      }
    }

    next();
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.idValidation = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("id is not valid");
  }
};
