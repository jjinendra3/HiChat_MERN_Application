import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate=useNavigate();
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
  function ValidateEmail(mail) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return false;
    }
    return true;
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    let num = parseInt(signup.phone);
    if (
      signup.pw === "" ||
      signup.email === "" ||
      signup.name === "" ||
      signup.cpw === "" ||
      signup.phone === ""
    ) {
      alert("No field should be left empty.");
      return;
    }
    if (isNaN(num)) {
      alert(
        "Phone number should not contain any dashes, pluses or any special character, only numbers are allowed."
      );
      return;
    }
    if (ValidateEmail(signup.email)) {
      alert("Please enter a valid email ID.");
      return;
    }
    if (signup.phone.length < 10 || signup.phone.length > 10) {
      alert("Phone number should be of 10 digits.");
      return;
    }
    if (signup.pw.length < 8) {
      alert("Password should be of minimum 8 characters.");
      return;
    }
    if (signup.pw !== signup.cpw) {
      alert("Password and Confirm password does not match.");
      return;
    }

    axios
      .post("http://localhost:5000/signup", {
        name: signup.name,
        phone: signup.phone,
        email: signup.email,
        password: signup.pw,
        friends: ["Init"],
      })
      .then((res)=> {
        setsignup({
          name: "",
          phone: "",
          email: "",
          pw: "",
          cpw: "",
        });
        alert( `Welcome to HiChat, ${signup.name}`);
        navigate('/');
      })
      .catch((error)=> {
        alert('The Email or the phone number is already in use, please try again!');
      });
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
