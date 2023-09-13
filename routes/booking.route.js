const {
  getAllBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  createBooking,
  createMultipleBooking,
} = require("../controllers/booking.controller");
const { updateBookingValidation, seatIsAvailable } = require("../middleware/booking.middleware");
const { isAdmin } = require("../middleware/isAdmin");
const { jwtValidation } = require("../middleware/jwtValidation");
const { seatValidation } = require("../utils/seatNoValidation");

module.exports = function (app) {
  app.get(
    "/movies/v1/booking/getAllBooking",
    [jwtValidation, isAdmin],
    getAllBooking
  );
  app.get(
    "/movies/v1/booking/getBookingById/:Id",
    [jwtValidation],
    getBookingById
  );
  app.put(
    "/movies/v1/booking/updateBooking/:Id",
    [jwtValidation, updateBookingValidation],
    updateBooking
  );
  app.delete(
    "/movies/v1/booking/deleteBooking/:Id",
    [jwtValidation],
    deleteBooking
  );
  app.post(
    "/movies/v1/booking/createOneBooking",
    [jwtValidation, updateBookingValidation],
    createBooking
  );
  app.post(
    "/movies/v1/booking/createMultipleBooking",[jwtValidation,updateBookingValidation],
      createMultipleBooking
  )
};
