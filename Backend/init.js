const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const uniqueness=require('./middleware/uniquecheck')
const url=require("./FireBaseURL")
app.use(cors());
app.use(express.json());
app.post("/signup",uniqueness, (req, res) => {
  if(req.checker){
    res.status(401).send('User with this email or phone number already exists!');
  }else{
            axios
          .post(
            url+"users.json",
            req.body
          )
          .then((resolve) => {
            res.send('Sucessful!');
            return;
          }).catch((err)=>{
            res.status(401).send('Unsucessful!');
            return;
          });
          return;
  }
  
});
  
app.listen(5000, () => {
  console.log("HiChat");
});
