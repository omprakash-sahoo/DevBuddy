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
      if (fromUserId == toUserId) {
        throw new Error("You can't send request to yourself");
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
requestRouter.post(
  "/request/review/:status/:requestId",
  userAUth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const { status, requestId } = req.params;

      if (!["accepted", "rejected"].includes(req.params.status)) {
        res.status(404).json({
          message: "Status not allowed",
        });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        // status: "interested",
      });
      if (!connectionRequest) {
        return res.json({
          message: `No connection exist`,
        });
      } else if (connectionRequest.status == "accepted") {
        return res.json({
          message: `Connection request is already accepted`,
        });
      } else if (connectionRequest.status == "rejected") {
        return res.json({
          message: `Connection request is already rejected`,
        });
      }
      connectionRequest.status = status;
      const successData = connectionRequest.save();
      if (successData) {
        res.json({
          message: `Connection Request is accepted By ${req.user.firstName}`,
          data: connectionRequest,
        });
      } else {
        res.json({
          message: `Something Went wrong`,
        });
      }
    } catch (err) {
      res.status(404).send(`Error ${err.message}`);
    }
  }
);
module.exports = requestRouter;
