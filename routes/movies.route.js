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
  app.get("/movies/v1/movies/getMovieById/:Id",[jwtValidation], getMovieById);
   app.post(
    "/movies/v1/movies/addMovie",
    [jwtValidation, isAdmin, verifyMoviesReqBody],
    createMovie
  );
   app.put(
    "/movies/v1/movies/updateMovieById/:Id",
    [jwtValidation, isAdmin, verifyMoviesReqBody],
    updateMovieById
  );
  app.delete(
    "/movies/v1/movies/deleteMovieById/:Id",
    [jwtValidation, isAdmin],
    deleteMovieById
  );

};
