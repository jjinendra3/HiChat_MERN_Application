const express = require("express");
const app = express.Router();
const CheckUser = require("../middleware/CheckUser");
const Conversation = require("../models/Conversations");

app.post("/addchat/:conversation_id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send("Invalid JWT Token");
  }
  try {
    const { conversation_id } = req.params;
    const response = await Conversation.findById(conversation_id);
    response.conversation.push(req.body);
    try {
      response.save();
      return res.send("Succesful");
    } catch (error) {
      return res.send("Error");
    }
  } catch (error) {
    return res.send("error");
  }
});

app.get("/getchats/:con_id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({s:false,error:"Invalid JWT Token"});
  }
  try {
    const response = await Conversation.findById(req.params.con_id);
    return res.send({
      messages: response.conversation,
      sender_id: req.user_id,
    });
  } catch (error) {
    return res.send({s:false,error:"error"});
  }
});
module.exports = app;
