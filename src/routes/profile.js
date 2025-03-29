const express = require("express");
const profileRouter = express.Router();
const { userAuth, validateEditProfile } = require("../middlewares/auth");
const User = require("../models/user");

profileRouter.get("/profile", userAuth, async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findOne({ _id: userId });
    console.log("user ", user);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting profile ", error);
  }
});

profileRouter.patch(
  "/profile/edit",
  userAuth,
  validateEditProfile,
  async (req, res, next) => {
    try {
      const userId = req.user;
      await User.findOneAndUpdate({ _id: userId }, req.body);
      console.log("user ", user);
      res.send(user);
    } catch (error) {
      res.status(400).send("Error getting profile ", error);
    }
  }
);

module.exports = profileRouter;
