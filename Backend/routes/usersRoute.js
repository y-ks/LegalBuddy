const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Lawyer = require("../models/lawyerModel");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409).json({ message: "User already exist" });
    return;
  }

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User registered Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      user = await Lawyer.findById(userId);
    }
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
