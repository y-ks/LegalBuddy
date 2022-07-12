const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Lawyer = require("../models/lawyerModel");
const Booking = require("../models/bookingModel");

router.post("/removeUser", async (req, res) => {
  const _id = req.body.userid;
  try {
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send("User removed");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/removeLawyer", async (req, res) => {
  const _id = req.body.lawyerid;
  try {
    const lawyer = await Lawyer.findOneAndDelete({ _id });
    if (!lawyer) {
      return res.status(404).send();
    }
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
