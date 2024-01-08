const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const uniqueness = require("../middleware/uniquecheck");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const CheckUser = require("../middleware/CheckUser");
const saltRounds = 10;

app.post("/signup", uniqueness, async (req, res) => {
  if (req.checker) {
    return res
      .status(401)
      .send("User with this email or phone number already exists!");
  } else {
    try {
      let obj = req.body;
      const hasher = await bcrypt.hash(
        obj.password,
        saltRounds,
        async function (err, hash) {
          if (err) {
            throw res.send("error");
          } else {
            obj.password = hash;
            let user = await User.create(obj);
          }
        },
      );
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
    bcrypt.compare(pw, user_detail.password, async function (err, result) {
      if (err) {
        return res.send({ s: false, error: "Please Try again later!" });
      }
      if (!result) {
        return res.send({ s: false, error: "Credentials do not match!" });
      }

      let obj = {
        key: user_detail._id.toString(),
        name: user_detail.name,
        email: user_detail.email,
        phone: user_detail.phone,
        friends: user_detail.friends,
      };
      let privateKey = "YOUR_PRIVATE_KEY";
      jwt.sign(obj.key, privateKey, async function (err, token) {
        if (err) {
          return res.send({ s: false, error: "Please try Again later!" });
        }
        user_detail.online = true;
        await user_detail.save();
        return res.send({ s: true, token, obj });
      });
    });
  } catch (error) {
    return error;
  }
});
app.get("/logout", CheckUser, async function (req, res) {
  if (!req.checker) {
    return res.send({ s: false, error: "Invalid Jwt Token!" });
  }
  try {
    const response = await User.findById(req.user_id);
    response.online = false;
    await response.save();
    res.send("Sucess");
  } catch (error) {
    res.send("error");
  }
});
module.exports = app;
