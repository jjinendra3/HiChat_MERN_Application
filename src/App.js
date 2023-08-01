import React from "react";
import icon from "./icon.png";
function App() {
  let arr = ["John", "Joshua", "Satish"];
  document.body.style.backgroundColor = "#91C8E4";
  return (
    <center>
      {/* Chat Interface */}
      <div className="main">
        <h1 style={{ textAlign: "center" }}>Chatting App</h1>
        <div className="list" style={{}}>
          {arr.map((element) => {
            return (
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
                  <div className="img" style={{}}>
                    <img
                      src={icon}
                      style={{ height: 75, width: 75 }}
                      alt="Profile Picture"
                    />
                  </div>
                  <div className="info" style={{ fontWeight: "bold" }}>
                    <p> {element} </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </center>
  );
}

export default App;
