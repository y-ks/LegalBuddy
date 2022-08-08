const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Lawyer = require("../models/lawyerModel");
const Booking = require("../models/bookingModel");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

router.post("/removeUser", async (req, res) => {
  const _id = req.body.userid;
  try {
    await Booking.deleteMany({ userid: _id });
    const conversation = await Conversation.find({
      members: { $in: [_id] },
    });
    await Message.deleteMany({
      conversationId: conversation[0]._id,
    });

    await Conversation.findOneAndDelete({ _id: conversation[0]._id });
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
    await Booking.deleteMany({ lawyerid: _id });
    const lawyer = await Lawyer.findOneAndDelete({ _id });
    if (!lawyer) {
      return res.status(404).send();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/verifyLawyer", async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({ _id: req.body.lawyerid });
    lawyer.isVerified = true;
    await lawyer.save();
    res.send("Verified Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/rejectLawyer", async (req, res) => {
  try {
    const lawyer = await Lawyer.findOneAndDelete({ _id: req.body.lawyerid });
    res.send("Removed Succesfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
