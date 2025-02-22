const express = require("express");

const app = express(); 


app.get('/user',(req,res, next)=>{
  return next();
  // res.send('Response 1');
},
(req,res, next)=>{
  // res.send('Response 2');
  next()
})

// app.use("/test", (req, res) => {
//     res.send("test file");
// });

// app.use((req, res) => {
//   // request-handler
//   // Configured to send this response to every request
//   res.send("Hello from the server!");
// });


app.get('/hello',(req,res,next)=>{
  // res.send('route hanlder2');
  next();
})

app.get('/hello', (req,res, next)=>{
  next();
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
 