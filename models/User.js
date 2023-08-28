const mongoose = require("mongoose");
const { userType } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: Number,
    require: true,
  },
  password:{
    type:String,
    require:true,
  },
  userType: {
    type: String,
    default: userType.User,
  },
  createdAt: {
    type: Date,
    default: () => new Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
