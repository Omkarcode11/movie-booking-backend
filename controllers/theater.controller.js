const Mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Theater = require("../models/Theater");

exports.getTheaterById = async (req, res) => {
  try {
    let id = req.params.id;
    if (!Mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send("Id is not valid");
    let theaters = await Theater.findById(id);

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
    let movies = await Theater.findById(req.params.id, "movies").populate(
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
    let theaterId = req.params.theaterId;
    let movieId = req.params.movieId;
    let theater = await Theater.findById(theaterId);
    if (theater) {
      let movie = await Movie.findById(movieId);
      if (movie) {
        let isMovie = theater.movies.includes(movieId);
        if (isMovie) return res.status(400).send("Movie is Already there");
        let isTheater = movie.theaters.includes(theaterId);
        if (isTheater) return res.status(400).send("Theater is already there");
        theater.movies.push(req.params.movieId);
        movie.theaters.push(req.params.theaterId);
        await theater.save();
        await movie.save();
        return res.status(200).send("Movie is Added Successfully");
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

exports.checkMovieInTheater = async (req, res) => {
  try{

    let movieId = req.params.movieId;
    let theaterId = req.params.theaterId;
    
    let theater = await Theater.findById(theaterId);
    if (theater.movies.includes(movieId)) {
      return res.status(200).send(true);
    } else {
      return res.status(300).send(false);
    }
  }catch(err){
    return res.status(500).send("Internal error")
  }
};
