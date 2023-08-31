const Mongoose = require("mongoose");

const theaterSchema = new Mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pinCode: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  movies: {
    type: [Mongoose.Types.ObjectId],
    ref: "Movie",
  },
});

module.exports = Mongoose.model("Theater", theaterSchema);
