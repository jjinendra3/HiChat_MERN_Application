const mongoose = require("mongoose");
const { Schema } = mongoose;
const Friends = new Schema({
  friend_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  conversation_id: {
    type: String,
    required: true,
  },
});
const Userschema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [Friends],
  },
  online: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", Userschema);
