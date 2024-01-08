const express = require("express");
const app = express.Router();
const CheckUser = require("../middleware/CheckUser");
const User = require("../models/Users");
const Conversation = require("../models/Conversations");
app.get("/getfriends/:searcher", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid Jwt Token!" });
  }
  try {
    const { searcher } = req.params;
    let id = searcher;
    let user_mail = await User.findOne({ email: id });
    let user_phone = await User.findOne({ phone: id });
    let user_name = await User.find({ name: id });
    if (user_mail === null && user_phone === null && user_name.length === 0) {
      return res.send({ s: false, error: "No Such USer Found!" });
    }
    if (user_mail) {
      let obj = [{ name: user_mail.name, id: user_mail._id.toString() }];
      if (obj.length !== 0) {
        return res.send({ s: true, obj });
      } else {
        return res.send({ s: false, error: "No Such User Found!" });
      }
    }
    if (user_phone) {
      let obj = [{ name: user_phone.name, id: user_phone._id.toString() }];
      if (obj.length !== 0) {
        return res.send({ s: true, obj });
      } else {
        return res.send({ s: false, error: "No Such User Found!" });
      }
    }
    if (user_name) {
      let obj = [];
      for (let i = 0; i < user_name.length; i++) {
        obj.push({ name: user_name[i].name, id: user_name[i]._id.toString() });
      }
      if (obj.length !== 0) {
        return res.send({ s: true, obj });
      } else {
        return res.send({ s: false, error: "No Such User Found!" });
      }
    }
  } catch (error) {
    return res.send({
      s: false,
      error: "Error right now! Please try again later!",
    });
  }
});

app.put("/addfriend/:id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid JWT Token" });
  }
  try {
    const { id } = req.params;
    if (id === req.user_id) {
      return res.send({ s: false, error: "You cannot be your own friend!" });
    }
    const response = await User.findById(req.user_id);
    const friend_response = await User.findById(id);
    if (response === null || friend_response === null) {
      return res.send({ s: false, error: "User Not found!" });
    }
    for (let i = 0; i < response.friends.length; i++) {
      if (response.friends[i].friend_id === id) {
        return res.send({
          s: false,
          error: "This user is already your friend!",
        });
      }
    }
    for (let i = 0; i < friend_response.friends.length; i++) {
      if (friend_response.friends[i].friend_id === req.user_id) {
        return res.send({
          s: false,
          error: "This user is already your friend!",
        });
      }
    }
    let convo = await Conversation.create({
      conversation: [
        {
          sender: "init",
          text: "init",
          time: "init",
        },
      ],
      typing: {
        user1: "",
        user2: "",
      },
    });
    const conversation_id = convo._id.toString();
    response.friends.push({
      friend_id: req.params.id,
      name: friend_response.name,
      conversation_id: conversation_id,
    });
    friend_response.friends.push({
      friend_id: req.user_id,
      name: response.name,
      conversation_id: conversation_id,
    });
    try {
      const updater_user_id = await response.save();
      const updater_params_id = await friend_response.save();
      return res.send({
        s: true,
        conversation_id,
        friends: updater_user_id.friends,
      });
    } catch (error) {
      return res.send({ s: false, error: "Error! Please try again later!" });
    }
  } catch (error) {
    return error;
  }
});

app.delete("/deletefriend/:c_id/:f_id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid JWT Token" });
  }
  try {
    const finder = await Conversation.findById(req.params.c_id);
    if (finder === null) {
      return res.send({ s: false, error: "Conversation Already Deleted." });
    }
    const deleter = await Conversation.findByIdAndDelete(req.params.c_id);
    const response = await User.findById(req.user_id);
    const friend_response = await User.findById(req.params.f_id);
    let res_obj = [];
    let res_friend_obj = [];
    for (let i = 0; i < response.friends.length; i++) {
      if (response.friends[i].friend_id !== req.params.f_id) {
        res_obj.push(response.friends[i]);
      }
    }
    response.friends = res_obj;
    for (let i = 0; i < friend_response.friends.length; i++) {
      if (friend_response.friends[i].friend_id !== req.user_id) {
        res_friend_obj.push(friend_response.friends[i]);
      }
    }
    friend_response.friends = res_friend_obj;
    let resso = await response.save();
    let frienda = await friend_response.save();
    res.send({ s: true, success: "Success!" });
  } catch (error) {
    res.send({
      s: false,
      error: "Some error occured, please try again later!",
    });
  }
});

app.delete("/deleteconvo/:c_id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid JWT Token" });
  }
  try {
    const finder = await Conversation.findById(req.params.c_id);
    if (finder === null) {
      return res.send({ s: false, error: "Conversation Already Deleted." });
    }
    finder.conversation = [
      {
        sender: "init",
        text: "init",
        time: "init",
      },
    ];
    let ok = await finder.save();
    res.send({ s: true, success: "Success!" });
  } catch (error) {
    res.send({
      s: false,
      error: "Some error occured, please try again later!",
    });
  }
});
app.get("/getmyfriends", CheckUser, async function (req, res) {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid Jwt Token!" });
  }
  try {
    const user_detail = await User.findById(req.user_id);
    const frr = user_detail.friends.slice(1);

    const arr = [];

    for (const friend of frr) {
      const frien = await User.findById(friend.friend_id);

      const ob = {
        friend_id: friend.friend_id,
        name: friend.name,
        conversation_id: friend.conversation_id,
        online: frien.online,
      };

      arr.push(ob);
    }

    res.send(arr);
  } catch (error) {
    console.log(error);
    res.status(500).send({ s: false, error: "Internal Server Error" });
  }
});

module.exports = app;
