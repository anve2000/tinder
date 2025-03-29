const express = require("express");
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {
  try {
    const payload = req.body;
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = new User({ ...payload, password: hashedPassword });
    await user.save();
    res.send("User created");
  } catch (err) {
    res.status(400).send("Error signing up " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid cred");
    }
    const doPasswordsMatch = await user.comparePasswords(password);
    if (!doPasswordsMatch) {
      throw new Error("Invalid cred");
    }
    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true });
    res.send("Hi " + user.firstName + ", good to see you back!");
  } catch (err) {
    res.status(400).send("Error logging in :" + err.message);
  }
});

authRouter.post('/logout',(req,res)=>{
  res.cookie('token', null, { 
    expires:new Date(Date.now())
  }).send('Logout success');
})

module.exports = authRouter;
