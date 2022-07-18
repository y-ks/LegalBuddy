const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    lawyerid: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookedTimeSlots: { from: { type: String }, to: { type: String } },
    isPaid: { type: Boolean, default: false },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    description: {
      type: String,
      required: true,
    },
    date: { type: String },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
