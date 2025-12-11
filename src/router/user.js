const express = require("express");
const { userAUth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.post("/user/request/received", userAUth, async (req, res) => {
  const requestData = await ConnectionRequest.find({
    toUserId: req.user._id,
    status: "interested",
  }).populate("fromUserId", "firstName lastName gender avatar about");
  res.send(requestData);
});
module.exports = userRouter;
