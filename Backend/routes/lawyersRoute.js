const express = require("express");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "../public/lawyers" });
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

router.post("/register", upload.single("img_src"), async (req, res) => {
  const oldFileName = req.file.filename;
  const newFileName = oldFileName + "." + req.file.mimetype.split("/")[1];
  fs.rename(
    `../public/lawyers/${oldFileName}`,
    `../public/lawyers/${newFileName}`,
    () => {}
  );
  const body = JSON.parse(req.body.data);
  const { email } = body;
  const userExist = await Lawyer.findOne({ email });
  if (userExist) {
    res.status(409).json({ message: "Lawyer already exist" });
    return;
  }

  try {
    const newLawyer = new Lawyer(body);
    newLawyer.img_src = newFileName;
    await newLawyer.save();
    res.send("Lawyer registered Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getalllawyers", async (req, res) => {
  try {
    const lawyer = await Lawyer.find();
    res.send(lawyer);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
