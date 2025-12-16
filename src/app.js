const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(cookieParser());
app.use(express.json());

// Replace default cors() with specific origin + credentials
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  // optional: you can restrict headers/methods if needed
  // allowedHeaders: ["Content-Type", "Authorization"],
  // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));
// add OPTIONS-only preflight handler that avoids registering a '*' route
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return cors(corsOptions)(req, res, next);
  }
  next();
});

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
const userRouter = require("./router/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
