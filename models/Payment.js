const Mongoose = require("mongoose");

const paymentSchema = new Mongoose.Schema({
  bookingId: {
    type: [Mongoose.Types.ObjectId],
    ref: "Booking",
    require: true,
  },
  userId: {
    type: Mongoose.Types.ObjectId,
    ref: "User",
    require: true
  },
  totalNoSeats: {
    type: Number,
    require: true
  },
  amount: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Mongoose.model("Payment", paymentSchema);
