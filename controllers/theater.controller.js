const Movie = require("../models/Movie");
const Theater = require("../models/Theater");

exports.getTheaterById = async (req, res) => {
  try {
    let theaters = await Theater.findById(req.params.id);

    if (theaters) {
      return res.status(200).send(theaters);
    } else {
      return res.status(400).send("Id is incorrect");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.getAllTheater = async (req, res) => {
  try {
    let allTheater = await Theater.find();
    if (allTheater) return res.status(200).send(allTheater);
    return res.status(400).send("Not found");
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.createTheater = async (req, res) => {
  try {
    let body = req.body;
    let theater = await Theater.create(body);

    if (theater) {
      return res.status(200).send("successfully create theater");
    } else {
      return res.status(400).send("theater is not crated");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.deleteTheater = async (req, res) => {
  try {
    let deleteTheater = await Theater.deleteOne({ _id: req.params.id });
    if (deleteTheater) {
      return res.status(200).send("Theater is deleted Successfully");
    } else {
      return res.status(400).send("id is incorrect");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.updateTheater = async (req, res) => {
  try {
    let body = req.body;

    let update = await Theater.updateOne(
      { _id: req.params.id },
      { $set: body }
    );

    if (update) {
      return res.status(200).send("your update is Successfully");
    }
    return res.status(400).send("your update is not successfully");
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.getAllMoviesInTheater = async (req, res) => {
  try {
    let movies = await Theater.findById(req.prams.id, "movies").populate(
      "movies"
    );
    if (movies) {
      return res.status(200).send(movies);
    } else {
      return res.status(400).send("your id is wrong");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.addMovieInTheater = async (req, res) => {
  try {
    let theater = await Theater.findById(req.prams.theaterId);
    if (theater) {
      let movie = await Movie.findById(req.prams.movieId);
      if (movie) {
        theater.movies.push(req.params.movieId);
        movie.theaters.push(req.params.theaterId)
        await theater.save();
        await movie.save();
      } else {
        return res.status(400).send("Movie Id is incorrect");
      }
    } else {
      return res.status(400).send("Theater Id is incorrect");
    }
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
};

exports.checkMovieInTheater = async(req,res)=>{
    
}