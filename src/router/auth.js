const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
// const User = require("./models/user");
const bcrypt = require("bcrypt");
// const { signUpValidation } = require("../utils/validation");
const { now } = require("mongoose");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body.firstName);
  try {
    // signUpValidation(req);
    const {
      firstName,
      lastName,
      emailId,
      passWord,
      age,
      gender,
      skills,
      avatar,
      about,
    } = req.body;
    const hashPwd = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashPwd,
      age,
      gender,
      skills,
      avatar,
      about,
    });
    await user.save();
    res.status(201).send("Sign up Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("SignUp Error" + err.message);
  }
});

authRouter.post("/signIn", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (user) {
      const match = user.validatePassword(req.body.passWord);
      //validatePassword is a schema method and defined in userSchema
      if (match) {
        const token = user.getJwt();
        //getJwt is a schema method and defined in userSchema
        res.cookie("token", token);
      } else {
        throw new Error("Invalid Credentials");
      }
    } else {
      throw new Error("Invalid Credentials");
    }
    res.json({
      message: "Login Success",
      data: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout successfully");
});

module.exports = authRouter;
