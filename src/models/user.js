const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    passWord: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong Password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email");
        }
      },
    },
    description: {
      type: String,
      default: "This is a default value",
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a supported gender",
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);
userSchema.methods.getJwt = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "Hello@123");
  return token;
};
userSchema.methods.validatePassword = function (inputPasswordByUser) {
  const user = this;
  const match = bcrypt.compare(inputPasswordByUser, user.passWord);
  return match;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
