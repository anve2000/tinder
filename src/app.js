const express = require("express");
const { connectdb } = require("./config/database");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const userRouter = require('./routes/user');
const requestRouter = require('./routes/requests')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', userRouter);
app.use('/', requestRouter);

connectdb()
  .then(() => {
    app.listen(7777, () => {
      console.log("Server successfully started");
    });
  })
  .catch((err) => {
    console.error("Error connecting database ", err);
  });

// does require statement execute first?
