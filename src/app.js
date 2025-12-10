const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

// handle JSON parse errors from body-parser / express.json
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }
  next();
});

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/connection");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
