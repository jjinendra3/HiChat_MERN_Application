import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "15px",
  };

  const contactHeadingStyle = {
    fontSize: "20px",
    textDecoration: "underline",
    marginBottom: "10px",
  };

  const ulStyle = {
    listStyleType: "none",
    padding: "0",
  };

  const liStyle = {
    marginBottom: "5px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        HiChat: A Real-time MERN Chatting Application
      </h2>
      <p style={paragraphStyle}>
        HiChat is a cutting-edge fullstack web project that showcases my
        expertise in developing interactive and secure web applications. Built
        on the MERN (MongoDB, Express.js, React, Node.js) stack, HiChat is a
        feature-rich real-time chatting application that takes user interaction
        to the next level.
      </p>
      <h2 style={headingStyle}>Key Features</h2>
      <p style={paragraphStyle}>
        <strong>Real-time Communication </strong>
        HiChat revolutionizes online communication by offering seamless
        real-time messaging. Users can connect with their friends and engage in
        live conversations without any delays or page refreshes. The application
        utilizes WebSockets to instantly update messages on both ends, creating
        a dynamic and engaging chatting experience.
      </p>
      <p style={paragraphStyle}>
        <strong>Secure Authentication </strong>
        Security is at the forefront of HiChat. The application employs
        industry-standard encryption techniques such as bcrypt to securely store
        and manage user passwords. JWT (JSON Web Tokens) are utilized for user
        authorization at every step, ensuring a safe and trusted environment for
        users to interact.
      </p>
      <p style={paragraphStyle}>
        <strong>Friend System </strong>
        HiChat enhances social interaction by allowing users to connect with
        friends. Users can send friend requests, expanding their network and
        enabling private conversations. The friend system is designed for ease
        of use and a seamless user experience.
      </p>

      <h1 style={headingStyle}>Developer's Note</h1>
      <p style={paragraphStyle}>
        HiChat is the result of my passion for building innovative and impactful
        web applications. Through the implementation of real-time messaging,
        robust authentication, and a thoughtfully designed friend system, I
        aimed to showcase my technical skills while creating a practical and
        enjoyable platform for users to connect. I invite you to explore HiChat
        and witness firsthand the power of real-time communication, secure
        authentication, and modern web development. Connect with me to learn
        more about my journey in creating HiChat and to discuss how my skills
        can contribute to your team.
      </p>
      <h2 style={contactHeadingStyle}>Contact Information:</h2>
      <ul style={ulStyle}>
        <li style={liStyle}>
          Email: <a href="mailto:jjinendra3@gmail.com">jjinendra3@gmail.com</a>
        </li>
        <li style={liStyle}>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/jjinendra3/">Jinendra Jain</a>
        </li>
        <li style={liStyle}>
          GitHub: <a href="https://github.com/jjinendra3">Jinendra Jain</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
