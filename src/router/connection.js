const express = require("express");
const requestRouter = express.Router();
const { userAUth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:userId",
  userAUth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }
      const toUserExist = await User.findOne({ _id: toUserId });
      if (!toUserExist) {
        throw new Error("User in not exist");
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, // A → B
          { fromUserId: toUserId, toUserId: fromUserId }, // B → A
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Connection Request is exist");
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = connectionRequest.save();
      if (data) {
        res.json({
          message: "Connection Request is sent",
        });
      }
    } catch (err) {
      res.status(401).send(err.message);
    }
  }
);

module.exports = requestRouter;
