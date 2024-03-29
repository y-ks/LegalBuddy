const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    lawyerid: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    lawyername: { type: String },
    lawyerAddress: { type: String },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    isPaid: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isRated: { type: Boolean, default: false },
    isFinished: { type: Boolean, default: false },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
