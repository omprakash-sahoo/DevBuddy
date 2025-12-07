const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const validator = require("validator");
const { signUpValidation } = require("./utils/validation");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userAUth } = require("./middleware/auth");
app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body.firstName);
  try {
    signUpValidation(req);
    const { firstName, lastName, emailId, passWord, age, gender, skills } =
      req.body;
    const hashPwd = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      passWord: hashPwd,
      age,
      gender,
      skills,
    });
    await user.save();
    res.status(201).send("Sign up Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("SignUp Error" + err.message);
  }
});

app.post("/signIn", async (req, res) => {
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
    res.send("Loging Success!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
app.get("/profile", userAUth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
app.get("/user", async (req, res) => {
  try {
    const userEmail = await User.findOne({ emailId: "rahul@gmai.com" });
    if (!userEmail) return res.status(404).send("User not found");
    res.send(userEmail);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const getAlluser = await User.find({});
    res.send(getAlluser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    if (!firstName) return res.status(400).send("emailId is required");
    const deletedUser = await User.deleteMany({ firstName: firstName });
    if (!deletedUser) return res.status(404).send("User not found");
    res.send("Deleted the user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/update/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;
    // console.log(userId);
    const updateUser = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      // returnDocument: "before",
      // lean: false,
    });
    res.send(userId);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
