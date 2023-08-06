import HiChat from "./ContextApi";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const HiChatData = ({ children }) => {
  const navigate = useNavigate();
  const [user_details, setuser_details] = useState();
  const [jwt_token, setjwt_token] = useState();
  function ValidateEmail(mail) {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return false;
    }
    return true;
  }
  const Signup = (signup, setsignup) => {
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
      .then((res) => {
        setsignup({
          name: "",
          phone: "",
          email: "",
          pw: "",
          cpw: "",
        });
        alert(`Welcome to HiChat, ${signup.name}`);
        navigate("/");
      })
      .catch((error) => {
        alert(
          "The Email or the phone number is already in use, please try again!"
        );
      });
  };
  const Login = (login, setlogin) => {
    if (login.id === "" || login.pw === "") {
      alert("Please enter all the fields to login.");
      return;
    }
    axios
      .post("http://localhost:5000/login", {
        id: login.id,
        pw: login.pw,
      })
      .then((res) => {
        setlogin({
          id: "",
          pw: "",
        });
        setjwt_token(res.data.token);
        setuser_details(res.data.obj);
        alert(`Welcome to HiChat, ${res.data.obj.name}`);
        navigate("/");
      })
      .catch((error) => {
        alert("Credentials do not match!");
      });
  };
  const GetUser = async () => {
    const response = await axios.get("http://localhost:5000/chatlist", {
      headers: {
        "auth-token": jwt_token,
      },
    });
    setuser_details(response.data);
  };
  return (
    <HiChat.Provider
      value={{ jwt_token, Signup, Login, GetUser, user_details, setjwt_token }}
    >
      {children}
    </HiChat.Provider>
  );
};
export default HiChatData;
