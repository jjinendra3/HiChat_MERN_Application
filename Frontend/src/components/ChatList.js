import React, { useContext, useEffect, useState } from "react";
import icon from "../icon.png";
import { Link } from "react-router-dom";
import ContextApi from "../ContextApi";
import axios from "axios";
function ChatList() {
  const context = useContext(ContextApi);
  const [first, setfirst] = useState([]);
  useEffect(() => {
    async function getMyfriends() {
      try {
        const response = await axios.get(
          `http://localhost:5000/friends/getmyfriends`,
          {
            headers: {
              "auth-token": context.jwt_token,
            },
          },
        );
        setfirst(response.data);
      } catch (error) {
        alert("Internal server");
      }
    }
    if (context.jwt_token) {
      getMyfriends();
    }
  });
  const friend_deleter = async (element) => {
    axios
      .delete(
        `http://localhost:5000/friends/deletefriend/${element.conversation_id}/${element.friend_id}`,
        {
          headers: {
            "auth-token": context.jwt_token,
          },
        },
      )
      .then((res) => {
        if (res.data.s === false) {
          return alert("There is some error please try again later!");
        }
        let arr = context.totalfriends.filter((ele) => {
          return ele.conversation_id !== element.conversation_id;
        });
        context.settotalfriends(arr);
        alert("Friend deleted succefully!");
      });
  };
  const convo_deleter = async (element) => {
    axios
      .delete(
        `http://localhost:5000/friends/deleteconvo/${element.conversation_id}`,
        {
          headers: {
            "auth-token": context.jwt_token,
          },
        },
      )
      .then((res) => {
        if (res.data.s === false) {
          return alert("There is some error please try again later!");
        }
        alert("Conversation deleted succefully!");
      });
  };
  document.body.style.backgroundColor = "#91C8E4";
  return (
    <div className="main">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>🙋‍♂️HiChat💬</h1>
      <center style={{ marginTop: "5%" }}>
        <div className="list">
          {context.jwt_token ? (
            first.length !== 0 ? (
              first.map((element) => {
                return (
                  <>
                    <Link
                      to={`/chat/:${element.conversation_id}/:${element.friend_id}`}
                      key={element.conversation_id}
                    >
                      <div>
                        <div
                          className="list-item"
                          style={{
                            padding: 10,
                            backgroundColor: "white",
                            border: "1px solid black",
                            margin: 10,
                            width: "30%",
                          }}
                        >
                          <div className="img">
                            <img
                              src={icon}
                              style={{
                                height: 75,
                                width: 75,
                                marginBottom: 10,
                              }}
                              alt="Profile Pic"
                            />
                          </div>
                          <div className="info" style={{ fontWeight: "bold" }}>
                            <p> {element.name} </p>
                            <p>{element.online ? "🟢Online" : "🔴Offline"}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        convo_deleter(element);
                      }}
                      style={{ margin: 5 }}
                    >
                      Delete Conversation
                    </button>
                    <button
                      onClick={() => {
                        friend_deleter(element);
                      }}
                      style={{ margin: 5 }}
                    >
                      Delete Friend
                    </button>
                  </>
                );
              })
            ) : (
              <p style={{ fontSize: 24, fontWeight: "bold" }}>
                Search people on HiChat to start a conversation.
              </p>
            )
          ) : (
            <p style={{ fontSize: 24, fontWeight: "bold" }}>
              Please Login to use HiChat!
            </p>
          )}
        </div>
      </center>
    </div>
  );
}

export default ChatList;
