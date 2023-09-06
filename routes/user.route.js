const {
  getUserById,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const { userValidate } = require("../middleware/userValidation");
const { jwtValidation } = require("./../middleware/jwtValidation");
const { isAdmin } = require("./../middleware/isAdmin");

module.exports = function (app) {
  app.get(
    "/movies/v1/user/getById",
    [jwtValidation, userValidate],
    getUserById
  );
  app.get("/movies/v1/user/all", [jwtValidation, isAdmin], getAllUsers);
  app.delete(
    "/movies/v1/user/deleteById/:Id",
    [jwtValidation, isAdmin],
    deleteUser
  );
  app.put("/movies/v1/user/updateById/:id", [jwtValidation], updateUser);
};
