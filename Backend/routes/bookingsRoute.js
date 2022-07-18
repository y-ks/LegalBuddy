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

router.get("/getallbookings", async (req, res) => {
  try {
    const booking = await Booking.find();
    res.send(booking);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
