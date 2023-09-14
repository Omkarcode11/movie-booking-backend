const {
  getTheaterById,
  getAllTheater,
  addMovieInTheater,
  getAllMoviesInTheater,
  createTheater,
  updateTheater,
  deleteTheater,
  removeMovieInTheater,
} = require("../controllers/theater.controller");
const { isAdmin } = require("../middleware/isAdmin");
const { jwtValidation } = require("../middleware/jwtValidation");
const {
  theaterBodyValidation,
} = require("../middleware/theaterBodyValidation");

module.exports = function (app) {
  app.get(
    "/movies/v1/theater/getTheaterById/:id",
    [jwtValidation],
    getTheaterById
  );
  app.get(
    "/movies/v1/theater/getAllTheater",
    [jwtValidation, isAdmin],
    getAllTheater
  );
  app.get(
    "/movies/v1/theater/getAllMovieInTheater/:id",
    [jwtValidation],
    getAllMoviesInTheater
  );
  app.post(
    "/movies/v1/theater/createTheater",
    [jwtValidation, theaterBodyValidation],
    createTheater
  );
  app.put(
    "/movies/v1/theater/updateTheaterById/:id",
    [jwtValidation, isAdmin, theaterBodyValidation],
    updateTheater
  );
  app.delete(
    "/movies/v1/theater/deleteTheaterById/:id",
    [jwtValidation, isAdmin],
    deleteTheater
  );
  app.put(
    "/movies/v1/theater/addMovieInTheater/:movieId/:theaterId",
    [jwtValidation, isAdmin],
    addMovieInTheater
  );
  app.put(
    "/movies/v1/theater/removeMovieInTheater/:movieId/:theaterId",
    [jwtValidation, isAdmin],
    removeMovieInTheater
  );
};
