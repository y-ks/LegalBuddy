const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Lawyer = require("../models/lawyerModel");
const Booking = require("../models/bookingModel");

router.post("/booklawyer", async (req, res) => {
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();
    res.send("Your Booking Request Succesfull");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/payment", async (req, res) => {
  try {
    const booking = await Booking.findById({ _id: req.body.bookid });
    if (booking) {
      booking.isPaid = true;
      await booking.save();
    }

    res.send("Your Booking Request Succesfull");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/verifyBooking", async (req, res) => {
  try {
    const booking = await Booking.findById({ _id: req.body.bookid });
    if (booking) {
      booking.isVerified = true;
      await booking.save();
    }

    res.send("Your Booking Verified Succesfull");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/finishBooking", async (req, res) => {
  try {
    const booking = await Booking.findById({ _id: req.body.bookid });
    if (booking) {
      booking.isFinished = true;
      await booking.save();
    }

    res.send("Your Booking Verified Succesfull");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/rejectBooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookid });
    res.send("Your Booking Verified Succesfull");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const booking = await Booking.find();
    res.send(booking);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
