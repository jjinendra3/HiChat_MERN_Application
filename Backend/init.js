const express = require("express");
const ConnecttoMongoDB = require("./db");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uniqueness = require("./middleware/uniquecheck");
const CheckUser = require("./middleware/CheckUser");
const User = require("./models/Users");
const Conversation = require("./models/Conversations");
ConnecttoMongoDB();

app.use(cors());
app.use(express.json());

app.post("/signup", uniqueness, async (req, res) => {
  if (req.checker) {
    return res
      .status(401)
      .send("User with this email or phone number already exists!");
  } else {
    try {
      let user = await User.create(req.body);
      return res.send("Sucessful");
    } catch (error) {
      return res.send("error");
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { id, pw } = req.body;
    let user_mail = await User.findOne({ email: id });
    let user_phone = await User.findOne({ phone: id });
    if (user_mail === null && user_phone === null) {
      throw res.send({ s: false, error: "No Such User found!" });
    }
    let user_detail;
    if (user_mail) {
      user_detail = user_mail;
    } else {
      user_detail = user_phone;
    }
    if (user_detail.password !== pw) {
      throw res.send({ s: false, error: "Credentials do not match!" });
    }
    let obj = {
      key: user_detail._id.toString(),
      name: user_detail.name,
      email: user_detail.email,
      phone: user_detail.phone,
      friends: user_detail.friends,
    };
    let privateKey = "YOUR_PRIVATE_KEY";
    jwt.sign(obj.key, privateKey, function (err, token) {
      if (err) {
        throw res.send({ s: false, error: "Please try Again later!" });
      }
      return res.send({ s: true, token, obj });
    });
  } catch (error) {
    return error;
  }
});

app.get("/getfriends/:searcher", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send("Invalid JWT Token");
  }
  try {
    const { searcher } = req.params;
    let id = searcher;
    let user_mail = await User.findOne({ email: id });
    let user_phone = await User.findOne({ phone: id });
    let user_name = await User.find({ name: id });
    if (user_mail === null && user_phone === null && user_name.length === 0) {
      return res.status(402).send("No Such User Found!");
    }
    if (user_mail) {
      let obj = [{ name: user_mail.name, id: user_mail._id.toString() }];
      return res.send(obj);
    }
    if (user_phone) {
      let obj = [{ name: user_phone.name, id: user_phone._id.toString() }];
      return res.send(obj);
    }
    if (user_name) {
      let obj = [];
      for (let i = 0; i < user_name.length; i++) {
        obj.push({ name: user_name[i].name, id: user_name[i]._id.toString() });
      }
      return res.send(obj);
    }
  } catch (error) {
    return res.send("error");
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
    } catch (error) {
      return res.send({ s: false, error: "Error! Please try again later!" });
    }

    return res.send({
      s: true,
      conversation_id,
      friends: updater_user_id.friends,
    });
  } catch (error) {
    return error;
  }
});

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
    return res.send("Invalid JWT Token");
  }
  try {
    const response = await Conversation.findById(req.params.con_id);
    return res.send({
      messages: response.conversation,
      sender_id: req.user_id,
    });
  } catch (error) {
    return res.send("error");
  }
});
app.listen(5000, () => {
  console.log("HiChat");
});
