const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      const toUser  =await User.findOne({_id: toUserId});
      if(!toUser){
        return res.status(404).send('User u re trying to connect isnt found')
      }

      if(existingConnectionRequest){
        return res.status(404).send('Connection request already exists');
      }

      const validStatusTypes = ["interested", "ignored"];
      if (!validStatusTypes.includes(status)) {
        return res
          .status(404)
          .send("'" + status + "'" + " status-type isnt valid");
      }

      const data = await connectionRequest.save();

      res.json({
        message: "Connection made successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error  " + error.message);
    }
  }
);

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req,res)=>{
  try{
    const {status, requestId} = req.params;
    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(404).send("Status value is invalid")
    }
    const loggedInUser = await User.findOne({_id:req.user});
    const request = await ConnectionRequest.findOne({_id: requestId, status: 'interested', toUserId: loggedInUser});
    if(!request){
      return res.status(404).send('Request dosnt already exist');
    }

    request.status = status;
    await request.save();
    res.send('Connection accepted successfully')

  }catch(error){
    res.status(500).send('Error processing review request');
  }
})

module.exports = requestRouter;
