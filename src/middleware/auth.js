const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAUth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Request!!");
    }
    const decodeObj = await jwt.verify(token, "Hello@123");
    const { _id } = decodeObj;
    const userData = await User.findOne({ _id, _id });
    if (!userData) {
      throw new Error("User not found!!!!");
    }
    req.user = userData;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  userAUth,
};
