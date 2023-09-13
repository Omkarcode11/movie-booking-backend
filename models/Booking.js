const Mongoose = require("mongoose");

const bookingSchema = new Mongoose.Schema({
  movieId: {
    type: Mongoose.Types.ObjectId,
    ref: "Movie",
    require: true,
  },
  theaterId: {
    type: Mongoose.Types.ObjectId,
    ref: "Theater",
    require: true,
  },
  userId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  seatNo: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "INPROGRESS",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Mongoose.model("Booking", bookingSchema);
