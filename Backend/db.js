const mongoose = require("mongoose");
const mongoURI = "mongodb://0.0.0.0:27017/hichat";
const ConnecttoMongoDB = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB Connection Succesful!");
  });
};
module.exports = ConnecttoMongoDB;
