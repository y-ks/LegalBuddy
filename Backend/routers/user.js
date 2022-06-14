const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();
const upload = multer({ dest: "images" });

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  const validUpdates = ["name", "age", "password", "email"];

  const isValidUpdate = updates.every((update) => {
    return validUpdates.includes(update);
  });

  if (!isValidUpdate) {
    return res.status(400).send({ error: "not valid update" });
  }
  try {
    const user = req.user;

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.token = req.user.token.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.token = [];

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/me/avatar", upload.single("avatar"), (req, res) => {
  res.status(200).send();
});

module.exports = router;
