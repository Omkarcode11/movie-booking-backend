const Movie = require("../models/Movie");

exports.createMovie = async (req, res) => {
  try {
    let body = req.body;

    let movie = await Movie.create(body);

    if (movie) {
      return res.status(200).send("Movie Added Successfully");
    }
    return res.status(400).send("Movie not added ");
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.deleteMovieById = async (req, res) => {
  try {
    let movieId = req.params.Id;

    if (!movieId || movieId.length < 5)
      return res.status(400).send("Your movie Id is not correct");

    let isDelete = await Movie.deleteOne({ _id: movieId });

    if (isDelete) {
      return res.status(200).send("Your movie deleted Successfully");
    } else {
      return res.status(300).send("Your movie id is wrong ");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.getMovieById = async (req, res) => {
  try {
    let movieId = req.params.Id;

    if (!movieId) return res.status(400).send("movie Id is missing");

    let movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(400).send("Your id is incorrect movie not found");
    }

    return res.status(200).send(movie);
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.updateMovieById = async (req, res) => {
  try {
    let movieId = req.params.Id;
    let updateMovie = req.body;

    let movie = await Movie.findById(movieId);

    for (const key in updateMovie) {
      movie[key] = updateMovie[key];
    }

    await movie.save();

    return res.status(200).send("Your movie is successfully updated");
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};
