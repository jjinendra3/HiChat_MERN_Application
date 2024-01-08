import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ContextApi from "../ContextApi";
const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(ContextApi);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            HiChat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/addfriends"
                >
                  Add Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          {context.jwt_token && (
            <button
              style={{ marginRight: 5 }}
              onClick={async () => {
                try {
                  await axios.get("http://localhost:5000/auth/logout", {
                    headers: {
                      "auth-token": context.jwt_token,
                    },
                  });
                  navigate("/login");
                } catch (error) {
                  console.log(error);
                  alert("There is an error, please try again some time later.");
                }
              }}
            >
              Logout
            </button>
          )}
          <Link className="nav-link active" to="/login">
            Login/Signup
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
