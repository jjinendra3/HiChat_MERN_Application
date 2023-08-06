import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatList from "./components/ChatList";
import Navbar from "./components/Navbar";
import About from "./components/About";
import SignUp from "./components/SignUp";
import ChatScreen from "./components/ChatScreen";
import HiChatData from "./ContextData";
import AddFriends from "./components/AddFriends";
function App() {
  return (
    <BrowserRouter>
      <HiChatData>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<ChatList />} />
          <Route exact path="/addfriends" element={<AddFriends />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/chat" element={<ChatScreen />} />
        </Routes>
      </HiChatData>
    </BrowserRouter>
  );
}

export default App;
