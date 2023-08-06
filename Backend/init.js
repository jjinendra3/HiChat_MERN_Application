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
    res
      .status(401)
      .send("User with this email or phone number already exists!");
  } else {
    axios
      .post(url + "users.json", req.body)
      .then((resolve) => {
        res.send("Sucessful!");
        return;
      })
      .catch((err) => {
        res.status(401).send("Unsucessful!");
        return;
      });
    return;
  }
});
app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  let num = parseInt(id);
  axios
    .get(url + "users.json")
    .then((resolve) => {
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
      if (obj === {}) {
        res.status(402).send("Credentials do not match!");
      } else {
        let privateKey = "YOUR_PRIVATE_KEY";
        jwt.sign(obj, privateKey, function (err, token) {
          res.send({ s: true, token, obj });
        });
      }
      return;
    })
    .catch((err) => {
      res.status(401).send({ s: false, err: err });
      return;
    });
  return;
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
app.listen(5000, () => {
  console.log("HiChat");
});
