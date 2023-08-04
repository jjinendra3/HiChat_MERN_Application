const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const uniqueness = require("./middleware/uniquecheck");
const url = require("./FireBaseURL");
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
      let obj = "";
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
            obj = key;
            break;
          }
        }
      }
      if (obj === "") {
        res.status(402).send("Credentials do not match!");
      } else {
        console.log("Bomma");
        let privateKey = "Jinendra";
        jwt.sign(obj, privateKey, function (err, token) {
          res.send({ s: true, token });
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

app.listen(5000, () => {
  console.log("HiChat");
});
