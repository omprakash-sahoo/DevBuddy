const express = require("express");
const { userAUth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.post("/user/request/received", userAUth, async (req, res) => {
  const requestData = await ConnectionRequest.find({
    toUserId: req.user._id,
    status: "interested",
  }).populate("fromUserId", "firstName lastName gender avatar about");
  if (requestData.length > 0) {
    res.json({
      message: `You have ${requestData.length} connection Request`,
      data: requestData,
    });
  } else {
    res.json({
      message: "No request Found",
    });
  }
});

userRouter.get("/user/connection", userAUth, async (req, res) => {
  const loggedInUser = req.user;
  const connectionData = await ConnectionRequest.find({
    $or: [
      {
        toUserId: loggedInUser._id,
        status: "accepted",
      },
      {
        fromUserId: loggedInUser._id,
        status: "accepted",
      },
    ],
  })
    .populate("fromUserId")
    .populate("toUserId", "firstName lastName gender avatar about");
  const myConnection = connectionData.map((row) => {
    if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });
  if (myConnection.length > 0) {
    return res.json({
      message: `You have ${myConnection.length} connection`,
      data: myConnection,
    });
  }
  res.json({
    message: `There is no connections`,
  });
});

userRouter.get("/user/feed", userAUth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Set objects are not JSON-serializable,Convert the Set to an array before using. Array.from(hideFromFeed) or [...hideFromFeed]

    const hideFromFeed = new Set();

    connectionRequest.map((row) => {
      hideFromFeed.add(row.fromUserId.toString());
      hideFromFeed.add(row.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName gender avatar skill about")
      .skip(skip)
      .limit(limit);

    // console.log(hideFromFeed);
    res.json({ data: user });
  } catch (err) {
    res.status(401).send(err.message);
  }
});
module.exports = userRouter;
