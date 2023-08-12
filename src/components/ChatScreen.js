import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContextAPi from "../ContextApi";
const ChatScreen = () => {
  const navigate = useNavigate();
  const context = useContext(ContextAPi);
  const { conversation_id } = useParams();
  const [msges, setmsges] = useState([]);
  const [header, setheader] = useState();
  const [msgtext, setmsgtext] = useState("");
  const getter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/chat/getchats/${conversation_id.slice(1)}`,
        {
          headers: {
            "auth-token": context.jwt_token,
          },
        }
      );
      if (res.data.s === false) {
        throw res.data.error;
      }
      setheader(res.data.sender_id);
      setmsges(res.data.messages.slice(1));
    } catch (err) {
      alert(err);
      navigate("/");
    }
  };
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (!context.jwt_token) {
      navigate("/login");
    }
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    async function caller() {
      await getter();
    }
    caller();
  });

  const adder = async () => {
    const today = new Date();
    let ms = Math.floor(Math.random() * 99 + 1);
    let time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      ":" +
      ms;
    axios
      .post(
        `http://localhost:5000/chat/addchat/${conversation_id.slice(1)}`,
        {
          sender: header,
          text: msgtext,
          time: time,
        },
        {
          headers: {
            "auth-token": context.jwt_token,
          },
        }
      )
      .then((res) => {
        getter();
        setmsgtext("");
      })
      .catch((err) => {
        alert(err);
        navigate("/");
      });
  };
  document.body.style.backgroundColor = "#91C8E4";
  return (
    <div>
      <center>
        <div
          ref={scrollContainerRef}
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
                      display: "flex",
                      borderRadius: 10,
                      marginTop: "0.5%",
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>{element.text}</p>
                    <small style={{ marginTop: "30%", left: "30%" }}>
                      {element.time}
                    </small>
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
              marginRight: "2.5%",
            }}
            onClick={adder}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </center>
    </div>
  );
};

export default ChatScreen;
