const {
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
} = require("../controllers/movie.controller");
const { isAdmin } = require("../middleware/isAdmin");
const { jwtValidation } = require("../middleware/jwtValidation");
const { verifyMoviesReqBody } = require("../middleware/verifyMovieReqBody");

module.exports = function (app) {
  app.get("movies/v1/auth/getMovieById/:Id", getMovieById);
  app.post(
    "movies/v1/auth/addMovie",
    [jwtValidation, isAdmin, verifyMoviesReqBody],
    createMovie
  );
  app.put(
    "movies/v1/auth/updateMovieById/:Id",
    [jwtValidation, isAdmin, verifyMoviesReqBody],
    updateMovieById
  );
  app.delete(
    "movies/v1/auth/deleteMovieById/:Id",
    [jwtValidation, isAdmin],
    deleteMovieById
  );
};
