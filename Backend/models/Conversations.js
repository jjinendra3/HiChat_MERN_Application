const mongoose = require("mongoose");
const { Schema } = mongoose;
const Messages = new Schema({
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
const Conversations = new Schema({
  conversation: {
    type: [Messages],
  },
});
module.exports = mongoose.model("conversations", Conversations);
