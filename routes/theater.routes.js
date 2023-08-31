const {
  getTheaterById,
  getAllTheater,
  addMovieInTheater,
  getAllMoviesInTheater,
  createTheater,
  updateTheater,
  deleteTheater,
} = require("../controllers/theater.controller");
const { isAdmin } = require("../middleware/isAdmin");
const { jwtValidation } = require("../middleware/jwtValidation");
const {
  theaterBodyValidation,
  idValidation,
} = require("../middleware/theaterbodyValidatioin");

module.exports = function (app) {
  app.get(
    "movies/v1/theater/getTheaterById/:id",
    [jwtValidation, idValidation],
    getTheaterById
  );
  app.get(
    "movies/v1/movies/getAllTheater/",
    [jwtValidation, isAdmin],
    getAllTheater
  );
  app.get(
    "movies/v1/movies/addMovieInTheater/:theaterId/:movieId",
    [jwtValidation, isAdmin],
    addMovieInTheater
  );
  app.get(
    "movies/v1/movies/getAllMovieInTheater/:id"[jwtValidation],
    getAllMoviesInTheater
  );
  app.post(
    "movies/v1/movies/createTheater/",
    [jwtValidation, theaterBodyValidation],
    createTheater
  );
  app.put(
    "movies/v1/movies/updateTheaterById/:id",
    [jwtValidation, theaterBodyValidation, idValidation],
    updateTheater
  );
  app.delete(
    "movies/v1/movies/deleteTheaterById/:id",
    [jwtValidation, idValidation],
    deleteTheater
  );
};
