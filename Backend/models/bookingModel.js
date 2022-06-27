const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: String },
    bookedTimeSlots: { from: { type: String }, to: { type: String } },
    isPaid: { type: Boolean, default: false },
    date: { type: Date },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
