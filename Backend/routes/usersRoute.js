const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

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

module.exports = router;
