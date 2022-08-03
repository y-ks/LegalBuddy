const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userType: { type: String, default: "lawyer" },
    img_src: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    education: {
      type: String,
      required: true,
      trim: true,
    },
    career: {
      total_cases: {
        type: Number,
      },
      cases_won: {
        type: Number,
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password includes word password");
        }
      },
    },
    location: {
      lattitude: { type: Number },
      longitude: { type: Number },
    },
    fee: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      default: ["Nepali", "English"],
    },
    token: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, "authenticate");
  user.token = user.token.concat({ token });
  await user.save();
  return token;
};

const Lawyer = mongoose.model("Lawyer", userSchema);

module.exports = Lawyer;
