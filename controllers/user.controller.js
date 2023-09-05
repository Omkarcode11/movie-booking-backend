const mongoose = require("mongoose");
const User = require("../models/User");

exports.getUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.Id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(400).send("User not found");
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let query = req.query;
    let user = await User.find(query);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.Id)) {
      return res.status(400).send("id is not valid");
    }

    let user = await User.deleteOne(req.params.Id);
    if (user) return res.status(200).send("User delete Success");
    else return res.status(400).send("User not found");
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    let updateBody = req.body;

    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).send("User Not Found ");
    }

    for (let key in updateBody) {
      if (user[key]) {
        user[key] = updateBody[key];
      }
    }
    await user.save();
    return res.status(200).send("Your user is updated successfully");
  } catch (error) {
    return res.status(500).send("Internal Error");
  }
};
