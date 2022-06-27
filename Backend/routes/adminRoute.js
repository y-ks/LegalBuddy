const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Lawyer = require("../models/lawyerModel");
const Booking = require("../models/bookingModel");

router.delete("/removeUser/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await Booking.findOneAndDelete({ user: { _id } });
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send("User removed");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/removeLawyer/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await Booking.findOneAndDelete({ lawyer: { _id } });
    const lawyer = await Lawyer.findOneAndDelete({ _id });
    if (!lawyer) {
      return res.status(404).send();
    }
    res.send("Lawyer removed");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/approveLawyer", async (req, res) => {
  try {
    const newLawyer = new Lawyer(req.body);
    await newLawyer.save();
    res.send("Lawyer registered Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
