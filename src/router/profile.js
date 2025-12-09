const express = require("express");
const profileRouter = express.Router();
const { userAUth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile/view", userAUth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAUth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request.");
      // return res.status(400).send("Invalid edit request.");
    } else {
      const logedInUser = req.user;
      const updatedData = {};
      Object.keys(req.body).forEach((keys) => {
        logedInUser[keys] = req.body[keys];
        updatedData[keys] = req.body[keys];
      });
      const isUpdated = await logedInUser.save();
      if (isUpdated) {
        res.json({ message: "Updated Successfully", data: updatedData });
      } else {
        throw new Error("Update Failed");
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
