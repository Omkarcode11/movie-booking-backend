const Movie = require("../models/Movie");
const User = require("../models/User");

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
  next();
};
