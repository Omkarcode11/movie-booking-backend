const Mongoose = require("mongoose");

exports.isIdCorrect = () => {
  for (let i = 0; i < arguments.length; i++) {
    if (!Mongoose.Types.ObjectId.isValid(arguments[i])) {
      return false;
    }
  }
  return true;
};
