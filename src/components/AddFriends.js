import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContextAPi from "../ContextApi";
const AddFriends = () => {
  const context = useContext(ContextAPi);
  const navigate = useNavigate();
  const [searcher, setsearcher] = useState("");
  const [friendlist, setfriendlist] = useState([]);
  useEffect(() => {
    if (context.jwt_token === undefined) {
      navigate("/login");
    }
  }, []);

  const onChange = (event) => {
    setsearcher(event.target.value);
  };
  const SearchFriend = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:5000/getfriends/${searcher}`, {
        headers: {
          "auth-token": context.jwt_token,
        },
      })
      .then(async (res) => {
        setfriendlist([...res.data]);
        setsearcher("");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const adder = (key, name) => {
    axios
      .put(
        `http://localhost:5000/addfriend/${key}`,
        {},
        {
          headers: {
            "auth-token": context.jwt_token,
          },
        }
      )
      .then(async (res) => {
        if (res.data.s === false) {
          throw res.data.error;
        }
        alert(`${name} is succesfully added to your lists.`);
        let arr = friendlist.filter((element) => {
          return element.id !== key;
        });
        setfriendlist(arr);
        context.settotalfriends(res.data.friends);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <center>
      <div
        className="title"
        style={{
          marginTop: "2%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <h1>AddFriends</h1>
      </div>
      <div
        className="login"
        style={{
          marginTop: "1%",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          width: "30%",
        }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name/Email/Phone
            </label>
            <input
              type="text"
              name="id"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={searcher}
              onChange={onChange}
            />
          </div>
          <div
            className="btn"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              onClick={SearchFriend}
            >
              Submit
            </button>
          </div>
        </form>
        <br />
        <div>
          {friendlist.length !== 0 &&
            friendlist.map((element) => {
              return (
                <div>
                  <div
                    className="list-item"
                    style={{
                      padding: 10,
                      backgroundColor: "white",
                      border: "1px solid black",
                      margin: 10,
                      width: "50%",
                    }}
                  >
                    <div className="img"></div>
                    <div className="info" style={{ fontWeight: "bold" }}>
                      <p> {element.name} </p>
                      <button onClick={() => adder(element.id, element.name)}>
                        Add to friends
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </center>
  );
};

export default AddFriends;
