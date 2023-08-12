const mongoose = require("mongoose");
const mongoURI = "mongodb://YOUR_IP_ADDRESS/hichat";
const ConnecttoMongoDB = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB Connection Succesful!");
  });
};
module.exports = ConnecttoMongoDB;
