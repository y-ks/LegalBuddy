const express = require("express");
const router = express.Router();

const Lawyer = require("../models/lawyerModel");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const lawyer = await Lawyer.findOne({ email, password });
    if (lawyer) {
      res.send(lawyer);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userExist = await Lawyer.findOne({ email });
  if (userExist) {
    res.status(409).json({ message: "Lawyer already exist" });
    return;
  }

  try {
    const newLawyer = new Lawyer(req.body);
    await newLawyer.save();
    res.send("Lawyer registered Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
