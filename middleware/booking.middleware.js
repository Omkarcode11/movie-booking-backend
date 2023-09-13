const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const { seatValidation } = require("../utils/seatNoValidation");

exports.updateBookingValidation = async (req, res, next) => {
  let updateBody = req.body;

  if (updateBody.userId) {
    let user = await User.findById(updateBody.userId);
    if (!user) return res.status(400).send("User Id is not valid");
  }
  if (updateBody.movieId) {
    let movie = await Movie.findById(updateBody.movieId);
    if (!movie) return res.status(400).send("movie id is not valid");
  }
  if (updateBody.theaterId) {
    let theater = await Movie.findById(updateBody.theaterId);
    if (!theater) return res.status(400).send("theater id is not valid");
    if (!theater.movies.includes(updateBody.movieId))
      return res.status(404).send("this movie is not in theater");
  }

  if (updateBody.seatNo&& seatValidation(updateBody.seatNo)) {
    let booking = await Booking.findOne(updateBody);
    if (booking) {
      return res.status(400).send("Seat is occupied already")
    }
  }
  next();
};

exports.seatIsAvailable = async (req, res, next) => {
  let body = req.body;
  if (!body.movieId) return res.status(400).send("movie id is invalid");
  if (!body.userId) return res.status(400).send("user id is invalid");
  if (!body.theaterIdId) return res.status(400).send("theaterId id is invalid");
  if (!body.seatNos || !seatValidation(body.seatNos)) return res.status(400).send("seatNo id is invalid");

  let booking = await Booking.findOne(body);
  if (booking) return res.status(400).send("seat is already booked");

  next();

};
