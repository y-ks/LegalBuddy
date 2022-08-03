const express = require("express");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "../public/lawyers" });
const router = express.Router();

const Lawyer = require("../models/lawyerModel");
const bookingModal = require("../models/bookingModel");

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

router.post("/rateLawyer", async (req, res) => {
  const lawyerid = req.body.lawyerid;
  const bookid = req.body.bookid;
  try {
    const lawyer = await Lawyer.findOne({ _id: lawyerid });
    const book = await bookingModal.findOne({ _id: bookid });
    lawyer.rating =
      (parseInt(lawyer.rating) + parseInt(req.body.rating) * 2) / 2;
    book.isRated = true;
    await lawyer.save();
    await book.save();
    res.send("success");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/finishBooking", async (req, res) => {
  const lawyerid = req.body.lawyerid;
  try {
    const lawyer = await Lawyer.findOne({ _id: lawyerid });
    lawyer.isisFinished = true;
    await lawyer.save();
    res.send("success");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/update", async (req, res) => {
  console.log("fromback");
  const data = req.body;
  const lawyerid = data.lawyerid;
  const fee = data.fee;
  const latitude = data.latitude;
  const longitude = data.longitude;
  try {
    const lawyer = await Lawyer.findOne({ _id: lawyerid });
    fee ? (lawyer.fee = fee) : null;
    latitude ? (lawyer.location.lattitude = latitude) : null;
    longitude ? (lawyer.location.longitude = longitude) : null;
    await lawyer.save();
    res.send("success");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
