## Documentation: HiChat - Real-Time Chat Application

This documentation is designed to guide you through the installation, features, and usage of HiChat. For a more brief walkthrough, watch the implementation video available on [Youtube](https://youtu.be/-EM2hSC4wN4)

### Prerequisites

Before you begin, ensure you have the following requirements:

1. **Node.js:**
   - Install the latest version of Node.js.
   - Ensure npm (Node Package Manager) is globally installed.
2. **MongoDB Compass:**
   - Download and install MongoDB Compass for convenient database management.

### Getting Started

1. **Download and Setup:**
   - Open the terminal and Run ‘npm run installer’
   - Run `npm run starter` to start the client and server.
   - Open another terminal and Run `cd frontend`.
   - Run `npm run start` (press y if it asks to open another port) to start the second client.
   - Two browsers will open, simulating two different users.

### Features

- **Authentication:**

  - Implemented using bcrypt for password hashing and JWT for secure user sessions.

- **Real-time Messaging:**

  - Utilizes WebSockets for seamless real-time message fetching and sending.
  - Users can edit and delete their sent messages.

- **Online and Typing Status:**

  - Displays real-time status updates for friends, indicating whether they are online & typing or not.

- **Friend Management:**
  - Users can add and remove friends.
  - Initiate and delete conversations.
  - Conversations and friends can be managed conveniently.

### How to Use the Application

- Sign up by clicking "Login/Signup" and then "Signup" on the login page.
- Create atleast two accounts with your details, ensuring a 10-digit phone number and a valid email address.

- Log in with one of the accounts, navigate to "Add Friends."
- Enter the exact name/email/phone number of the friend to add.
- If an error occurs, ensure there are no whitespaces in the input or stored database.

- Go to the home page, find the added friend in the list, and click to start chatting.
- Log in with the second account in a different browser window to see the friend in the friendlist.
- Users can also edit and delete sent messages within the conversation.
- After chatting, log out from one browser window, and observe the online status update in the other (It will go offline).

- Users can also delete conversations and remove friends as per their convenience.

### Developer

Made by Jinendra Jain

- Email: [jjinendra3@gmail.com](mailto:jjinendra3@gmail.com)
- LinkedIn: [Jinendra jain](https://www.linkedin.com/in/jjinendra3/)
- GitHub: [Jinendra Jain](https://github.com/jjinendra3)
