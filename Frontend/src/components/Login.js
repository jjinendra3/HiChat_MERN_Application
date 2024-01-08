import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ContextAPI from "../ContextApi";
function Login() {
  const context = useContext(ContextAPI);
  document.body.style.backgroundColor = "#91C8E4";
  const [login, setlogin] = useState({
    id: "",
    pw: "",
  });
  const onChange = (event) => {
    setlogin({ ...login, [event.target.name]: event.target.value });
  };
  const Login = (event) => {
    event.preventDefault();
    context.Login(login, setlogin);
  };
  return (
    <>
      <div
        className="title"
        style={{
          marginTop: "7%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <h1>Login</h1>
      </div>
      <div
        className="login"
        style={{
          marginTop: "5%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email/Phone
            </label>
            <input
              type="text"
              name="id"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={login.id}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="pw"
              onChange={onChange}
              value={login.pw}
            />
          </div>
          <div
            className="btn"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button type="submit" className="btn btn-primary" onClick={Login}>
              Submit
            </button>
          </div>
          <div
            className="signer"
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <p>
              Not a User? <Link to="/signup">SignUp</Link> Now!
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
