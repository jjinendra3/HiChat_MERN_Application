const express = require("express");
const app = express.Router();
const CheckUser = require("../middleware/CheckUser");
const Conversation=require('../models/Conversations');

app.get("/getchats/:con_id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid JWT Token" });
  }
  try {
    const response = await Conversation.findById(req.params.con_id);
    return res.send({
      messages: response.conversation,
      sender_id: req.user_id,
      typing: response.typing,
    });
  } catch (error) {
    return res.send({ error});
  }
});

app.put("/editchat/:id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid JWT Token" });
  }
  try {
    const response = await Conversation.findById(req.params.id);
    for (let i = 0; i < response.conversation.length; i++) {
      if (response.conversation[i]._id.toString() === req.body.element._id) {
        response.conversation[i].text = req.body.element.text;
        break;
      }
    }
    const letter = await response.save();
    res.send("Sucessful");
  } catch (error) {
    res.send({ error });
  }
});
module.exports = app;
