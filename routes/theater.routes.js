const {
  getTheaterById,
  getAllTheater,
  addMovieInTheater,
  getAllMoviesInTheater,
  createTheater,
  updateTheater,
  deleteTheater,
} = require("../controllers/theater.controller");

module.exports = function (app) {
  app.get("movies/v1/theater/getTheaterById/:id", getTheaterById);
  app.get("movies/v1/movies/getAllTheater/", getAllTheater);
  app.get(
    "movies/v1/movies/addMovieInTheater/:theaterId/:movieId",
    addMovieInTheater
  );
  app.get("movies/v1/movies/getAllMovieInTheater/:id", getAllMoviesInTheater);
  app.post("movies/v1/movies/createTheater/", createTheater);
  app.put("movies/v1/movies/updateTheaterById/:id", updateTheater);
  app.delete("movies/v1/movies/deleteTheaterById/:id", deleteTheater);
};
