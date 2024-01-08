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
  typing: {
    user1: {
      type: String,
      default: "",
    },
    user2: {
      type: String,
      default: "",
    },
  },
});
module.exports = mongoose.model("conversations", Conversations);
