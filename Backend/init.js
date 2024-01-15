const express = require("express");
const ConnecttoMongoDB = require("./db");
const app = express();
const cors = require("cors");
const Conversation = require("./models/Conversations");
ConnecttoMongoDB();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/friends", require("./routes/friends"));
app.use("/chat", require("./routes/chat"));
server.listen(5000, () => {
  console.log("HiChat");
});

io.on("connection", (socket) => {
  socket.on("sendMessage", async (message) => {
    try {
      const conversation_id = message.conid;
      const response = await Conversation.findById(conversation_id);
      let obj = {
        sender: message.sender,
        text: message.text,
        time: message.time,
      };
      response.conversation.push(obj);
      await response.save();
      io.emit(`message${conversation_id}${message.sender}`, message);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  });
  socket.on('typing',async function(msg){
    const conversation = await Conversation.findById(msg.conid);
    if (conversation.typing.user1 === "") {
      conversation.typing.user1 = msg.writer;
    } else {
      conversation.typing.user2 = msg.writer}
      await conversation.save();
      io.emit(`typing${msg.conid}`, conversation.typing);
  });
  socket.on('removetyping',async function(msg){
    const conversation = await Conversation.findById(msg.conid);
    if (conversation.typing.user1 === msg.writer) {
      conversation.typing.user1 ="";
    } 
    if (conversation.typing.user2 === msg.writer) 
     {
      conversation.typing.user2 =""
    }
      await conversation.save();
      io.emit(`typing${msg.conid}`, conversation.typing);
  });
  socket.on('func',async function(msg){
    io.emit(`func${msg.conid}`,{refresh:true});
  })
});