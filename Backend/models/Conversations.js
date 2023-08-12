const mongoose = require("mongoose");
const { Schema } = mongoose;
const Messages = new Schema({
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  time: {
    type: String,
  },
});
const Conversations = new Schema({
  conversation: {
    type: [Messages],
  },
});
module.exports = mongoose.model("conversations", Conversations);
