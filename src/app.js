const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
