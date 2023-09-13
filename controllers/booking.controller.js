const Mongoose = require("mongoose");
const Booking = require("../models/Booking");
const { bookingStatus } = require("../utils/constants");

exports.getAllBooking = async (req, res) => {
  try {
    let booking = await Booking.find(query);
    if (booking) return res.status(200).send(booking);
    else return res.status(300).send("There no Booking available");
  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" });
  }
};
exports.getBookingById = async (req, res) => {
  try {
    let bookingId = req.params.Id;
    if (!Mongoose.Types.ObjectId.isValid(bookingId))
      return res.status(400).send("Booking Id is not valid");

    let booking = await Booking.findById(bookingId);

    if (booking) return res.status(200).send(booking);
    else return res.status(400).send("Booking not found");
  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" });
  }
};
exports.updateBooking = async (req, res) => {
  try {
    let updateBody = req.body;
    let bookingId = req.params.Id;
    let booking = await Booking.findById(bookingId);
    if (booking.status == bookingStatus.InProgress) {
      if (
        updateBody.status == bookingStatus.Cancel ||
        updateBody.status == bookingStatus.Successful
      ) {
        for (let key in updateBody) {
          if (booking[key] && updateBody[key]) {
            booking[key] = updateBody[key];
          }
        }
        await booking.save();

        return res.status(200).send("Your Booking Updated");
      } else {
        return res.status(400).send({ msg: "Invalid Status Providing " });
      }
    } else {
      return res.status(200).send({
        msg: `your booking Status is ${booking.status} that's why it not possible to update`,
      });
    }
  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" });
  }
};
exports.deleteBooking = async (req, res) => {
  try {
    let id = req.params.Id;
    if (!Mongoose.Types.ObjectId.isValid(id))
      return res.status(400).send({ msg: "Id is not valid" });
    let booking = await Booking.deleteOne({ _id: id });
    if (booking) {
      return res.status(200).send({ msg: "Booking deleted" });
    } else {
      return res.status(404).send({ msg: "Booking not found" });
    }
  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" });
  }
};
exports.createBooking = async (req, res) => {
  try {
    let body = req.body;

    let booking = await Booking.create(body);
    if (booking) {
      return res.status(200).send({ msg: "Booking Successfully Created", booking: { id: booking._id, userId: body.userId } });
    } else {
      return res.status(400).send({ msg: "Booking is not created" });
    }
  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" });
  }
};


exports.createMultipleBooking = async (req, res) => {
  try {
    let body = req.body
    let starRange = Number(body.seatNo.slice(1, 2))
    let endRange = Number(body.seatNo.slice(4))
    let char = Number(body.seatNo.slice(0, 1))
    let allBooking = []
    let i;
    for (i = starRange; i <= endRange; i++) {
      body.seatNo = `${char}${i}`
      let booking = await Booking.create(body)
      if (booking)
        allBooking.push(booking._id)
      else break
    }

    if (i == endRange) {
      return res.status(200).send({ booking: { ids: allBooking, userId: body.userId }, msg: "Booking are created successfully" })
    }
    let fail = i
    for (let i = 0; i < allBooking.length; i++) {
      await Booking.deleteOne(allBooking[i])
    }
    return res.status(400).send({ msg: `All Booking fail because ${fail} seat is not available` })

  } catch (error) {
    return res.status(error).send({ error, msg: "Internal Error" })
  }
}