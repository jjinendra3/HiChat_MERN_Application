import React from "react";
import icon from "../icon.png";
function ChatList() {
  let arr = ["John", "Joshua", "Satish"];

  document.body.style.backgroundColor = "#91C8E4";
  return (
    <div className="main">
      <h1 style={{ textAlign: "center", marginTop: "3%" }}>🙋‍♂️HiChat💬</h1>
      <center style={{ marginTop: "5%" }}>
        <div className="list">
          {arr.length !== 0 ? (
            arr.map((element) => {
              return (
                <div>
                  <div
                    onClick={() => {
                      alert("Hello!");
                    }}
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
