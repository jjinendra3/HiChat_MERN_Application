const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uniqueness = require("./middleware/uniquecheck");
const url = require("./FireBaseURL");
const CheckUser = require("./middleware/CheckUser");
app.use(cors());
app.use(express.json());
app.post("/signup", uniqueness, (req, res) => {
  if (req.checker) {
    return res
      .status(401)
      .send("User with this email or phone number already exists!");
  } else {
    axios
      .post(url + "users.json", req.body)
      .then((resolve) => {
        return res.send("Sucessful!");
      })
      .catch((err) => {
        return res.status(401).send("Unsucessful!");
      });
  }
});
app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  let num = parseInt(id);
  try {
    axios.get(url + "users.json").then((resolve) => {
      let obj = {};
      let check = 0;
      if (isNaN(num)) {
        check = 1;
      }
      for (key in resolve.data) {
        if (
          !check
            ? resolve.data[key].phone === id
            : resolve.data[key].email === id
        ) {
          if (resolve.data[key].password === pw) {
            obj = {
              key: key,
              name: resolve.data[key].name,
              email: resolve.data[key].email,
              phone: resolve.data[key].phone,
              friends: resolve.data[key].friends,
            };
            break;
          }
        }
      }
      if (obj.key === undefined) {
        return res.status(402).send("Credentials do not match!");
      } else {
        let privateKey = "YOUR_PRIVATE_KEY";
        jwt.sign(obj.key, privateKey, function (err, token) {
          if (err) {
            return res.status(402).send({ s: false });
          }
          return res.send({ s: true, token, obj });
        });
      }
    });
  } catch (error) {
    return res.status(401).send({ s: false, err: error });
  }
});
app.get("/getfriends/:searcher", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send("Invalid JWT Token");
  }
  const { searcher } = req.params;
  try {
    const response = await axios.get(url + "users.json");
    let obj = [];
    for (key in response.data) {
      if (
        response.data[key].name === searcher ||
        response.data[key].email === searcher ||
        response.data[key].phone === searcher
      ) {
        obj.push({ name: response.data[key].name, id: key });
      }
    }
    return res.send(obj);
  } catch (error) {
    return res.send(error);
  }
});
app.put("/addfriend/:id", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.send("Invalid JWT Token");
  }
  try {
    const obj = await axios.get(url + `users/${req.user_id}.json`);
    const letobj = await axios.get(url + `users/${req.params.id}.json`);
    let letfriend = [...letobj.data.friends];
    let friendss = [...obj.data.friends];
    for (let i = 1; i < friendss.length; i++) {
      if (friendss[i].id === req.params.id) {
        throw res.status(403).send("You are already friends!");
      }
    }
    for (let i = 1; i < letfriend.length; i++) {
      if (letfriend[i].id === req.user_id) {
        throw res.status(403).send("You are already friends!");
      }
    }
    friendss.push({ id: req.params.id, name: letobj.data.name });
    letfriend.push({ id: req.user_id, name: obj.data.name });
    obj.data.friends = friendss;
    letobj.data.friends = letfriend;
    const response = await axios.put(
      url + `users/${req.user_id}.json`,
      obj.data
    );
    const letresponse = await axios.put(
      url + `users/${req.params.id}.json`,
      letobj.data
    );
    return res.send("Sucess!");
  } catch (error) {
    return error;
  }
});
app.listen(5000, () => {
  console.log("HiChat");
});
