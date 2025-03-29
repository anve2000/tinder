const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.send(user);
  } catch (err) {
    res.status(404).send("Error finding User " + err);
  }
});

userRouter.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.send(user);
  } catch (err) {
    res.status(404).send("Error finding User ", err);
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const userId = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: userId },
        { toUserId: userId },
        { status: "accepted" },
      ],
    }).populate("fromUserId", "_id firstName lastName age photoUrl");

    res.status(200).send({connections: connections})
  } catch (error) {}
});

userRouter.get("/feed",userAuth, async (req, res) => {
  try {
    const id = req.user; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1)*limit
    console.log('id  ', id);
    const userRequests = await ConnectionRequest.find({$or:[
      {
        fromUserId:id
      },{
        toUserId:id
      }
    ]}).select("fromUserId toUserId").skip(skip).limit(limit);


    let uniqueIds = new Set();
    for(let req of userRequests){
      uniqueIds.add(req.fromUserId);
      uniqueIds.add(req.toUserId);
    }

    const feedData = await User.find({$and:[{_id: {$nin: [...uniqueIds]}}, 
      // {_id:{$ne:[id]}}
    ]}).select("_id firstName lastName email");
    res.send(feedData);
  } catch (error) {
    res.status(404).send("Error finding User ", err);
  }
});

module.exports = userRouter;
