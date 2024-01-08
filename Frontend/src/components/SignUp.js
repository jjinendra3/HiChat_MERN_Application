import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ContextAPI from "../ContextApi";
const SignUp = () => {
  const context = useContext(ContextAPI);
  document.body.style.backgroundColor = "#91C8E4";
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    phone: "",
    pw: "",
    cpw: "",
  });
  const onChange = (event) => {
    setsignup({ ...signup, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    context.Signup(signup, setsignup);
  };
  return (
    <>
      <div
        className="title"
        style={{
          marginTop: "2%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <h1>SignUp</h1>
      </div>
      <div
        className="signup"
        style={{
          marginTop: "2%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={signup.name}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your details with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={signup.phone}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="email"
              value={signup.email}
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
              value={signup.pw}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="cpw"
              value={signup.cpw}
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
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div
            className="signer"
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <p>
              Already a User? <Link to="/login">Login</Link> Now!
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
