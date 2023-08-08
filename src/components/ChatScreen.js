import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContextAPi from "../ContextApi";
const ChatScreen = () => {
  const context = useContext(ContextAPi);
  const { conversation_id } = useParams();
  const [msges, setmsges] = useState([]);
  const [header, setheader] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getchats/${conversation_id.slice(1)}`, {
        headers: {
          "auth-token": context.jwt_token,
        },
      })
      .then((res) => {
        setheader(res.data.sender_id);
        setmsges(res.data.messages);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  document.body.style.backgroundColor = "#91C8E4";
  const [msgtext, setmsgtext] = useState("");
  return (
    <div>
      <center>
        <div
          className="chat"
          id="chatarea"
          style={{
            height: window.innerHeight - 170,
            width: "90%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "1%",
            overflowY: "auto",
          }}
        >
          {msges.length !== 0 ? (
            msges.map((element) => {
              return (
                <div
                  key={element.time}
                  className="mmsssg"
                  style={
                    header === element.sender
                      ? { justifyContent: "right", display: "flex" }
                      : { justifyContent: "left", display: "flex" }
                  }
                >
                  <div
                    className="msg"
                    style={{
                      border: "1px solid blue",
                      width: "20%",
                      display: "flex",
                      borderRadius: 10,
                      marginTop: "0.5%",
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>{element.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                marginTop: "20%",
                fontSize: 38,
                fontWeight: "bold",
              }}
            >
              Send a 🙋‍♂️HiChat to start the chat!
            </p>
          )}
        </div>
        <div
          className="input"
          style={{ justifyContent: "left", display: "flex", marginLeft: "5%" }}
        >
          <input
            type="text"
            style={{
              marginTop: "2%",
              width: "90%",
              borderRadius: 10,
              padding: 5,
            }}
            value={msgtext}
            onChange={(event) => {
              setmsgtext(event.target.value);
            }}
          />
          <button
            style={{
              marginTop: "2%",
              borderRadius: 20,
              padding: 10,
              marginLeft: "1.2%",
            }}
            onClick={() => {}}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </center>
    </div>
  );
};

export default ChatScreen;
