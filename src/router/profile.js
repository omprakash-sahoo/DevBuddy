const express = require("express");
const profileRouter = express.Router();
const { userAUth } = require("../middleware/auth");

profileRouter.get("/profile", userAUth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
