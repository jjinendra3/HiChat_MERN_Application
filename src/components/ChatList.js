import React, { useContext, useEffect, useState } from "react";
import icon from "../icon.png";
import { Link } from "react-router-dom";
import ContextApi from "../ContextApi";
function ChatList() {
  const context = useContext(ContextApi);
  const [first, setfirst] = useState([]);
  useEffect(() => {
    if (context.jwt_token) {
      let arr = [...context.totalfriends];
      setfirst(arr);
    }
  }, []);
  document.body.style.backgroundColor = "#91C8E4";
  return (
    <div className="main">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>🙋‍♂️HiChat💬</h1>
      <center style={{ marginTop: "5%" }}>
        <div className="list">
          {context.jwt_token ? (
            first.slice(1).length !== 0 ? (
              first.slice(1).map((element) => {
                return (
                  <Link
                    to={`/chat/:${element.conversation_id}`}
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
                            style={{ height: 75, width: 75, marginBottom: 10 }}
                            alt="Profile Pic"
                          />
                        </div>
                        <div className="info" style={{ fontWeight: "bold" }}>
                          <p> {element.name} </p>
                        </div>
                      </div>
                    </div>
                  </Link>
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
