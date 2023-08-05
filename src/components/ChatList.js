import React, { useContext, useEffect, useState } from "react";
import icon from "../icon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ContextApi from "../ContextApi";
function ChatList() {
  const [arr, setarr] = useState([]);
  const context = useContext(ContextApi);
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.jwt_token) {
      navigate("/login");
    } else {
      context.GetUser().then(() => {
        console.log(context.user_details.friends);

        setarr([...context.user_details.friends]);
      });
    }
  }, []);

  document.body.style.backgroundColor = "#91C8E4";
  return (
    <div className="main">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>🙋‍♂️HiChat💬</h1>
      <center style={{ marginTop: "5%" }}>
        <div className="list">
          {arr.length !== 0 ? (
            arr.map((element) => {
              return (
                <Link to="/chat">
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
                        <p> {element} </p>
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
          )}
        </div>
      </center>
    </div>
  );
}

export default ChatList;
