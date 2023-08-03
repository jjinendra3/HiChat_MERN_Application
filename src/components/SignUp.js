import React,{useState} from 'react'
import {Link} from "react-router-dom"
const SignUp = () => {
    document.body.style.backgroundColor = "#91C8E4";
    const [signup, setsignup] = useState({
      email: "",
      phone:'',
      pw: "",
      cpw:'',
    });
    const onChange = (event) => {
      setsignup({ ...signup, [event.target.name]: event.target.value });
    };
  return (
    <>
      <div
        className="title"
        style={{
          marginTop: "3%",
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
          marginTop: "5%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <form>
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
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your details with anyone else.
            </div>
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
              onClick={() => {
                let num=parseInt(signup.phone);
                if(isNaN(num)){
                    alert('Phone number should not contain any dashes, pluses or any special character, only numbers are allowed.');
                }
                if(signup.pw!==signup.cpw){
                    alert('Password and Confirm password does not match.');
                    return;
                }
                setsignup({
                  phone: "",
                  email:'',
                  pw: "",
                  cpw:""
                });
              }}
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
  )
}

export default SignUp