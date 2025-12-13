const { text } = require("express");
const mongoose = require("mongoose");
const ConnectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect value`,
      },
    },
  },
  {
    timestamps: true,
  }
);
// Pre Hokes to check before every save
ConnectionRequestSchema.pre("save", function (next) {
  const connectionReq = this;
  if (connectionReq.fromUserId.equals(this.toUserId)) {
    throw new Error("Connection Req can't sent to yourself!!");
  }
  next;
});
const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);
module.exports = ConnectionRequest;
