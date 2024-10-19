import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MessageList from "../components/Chat/MessageList";
import MessageInput from "../components/Chat/MessageInput";
import RoomList from "../components/Chat/RoomList";
import OnlineUsers from "../components/Chat/OnlineUsers";
import useSocket from "../hooks/useSocket";
import { useAuthStore } from "../store/authStore";

function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const socket = useSocket();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket && user && roomId) {
      // Join the chat room
      socket.emit("joinRoom", { username: user.name, room: roomId });

      // Listen for room information
      socket.on("roomInfo", (info) => {
        setRoomName(info.name);
      });

      // Listen for new messages
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Listen for existing messages
      socket.on("loadMessages", (roomMessages) => {
        setMessages(roomMessages);
      });

      // Listen for typing events
      socket.on("typing", (username) => {
        if (username !== user.name) {
          setIsTyping(true);
          setTypingUser(username);
        }
      });

      // Listen for stop typing events
      socket.on("stopTyping", () => {
        setIsTyping(false);
        setTypingUser("");
      });

      // Listen for online users
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup on unmount
      return () => {
        leaveRoom();
      };
    }
  }, [socket, user, roomId]);

  const sendMessage = (text) => {
    if (socket && user) {
      socket.emit("chatMessage", { room: roomId, username: user.name, text });
      socket.emit("stopTyping", roomId); // Stop typing event when message is sent
    }
  };

  const handleTyping = () => {
    if (socket && user) {
      socket.emit("typing", { username: user.name, room: roomId });
    }
  };

  const handleStopTyping = () => {
    if (socket && user) {
      socket.emit("stopTyping", roomId);
    }
  };

  const leaveRoom = () => {
    if (socket && user) {
      socket.emit("leaveRoom", { username: user.name, room: roomId });
      socket.off("message");
      socket.off("loadMessages");
      socket.off("typing");
      socket.off("stopTyping");
      socket.off("onlineUsers");
      socket.off("roomInfo");
    }
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate("/rooms");
  };

  return (
    <div className="chat-container">
      <style>{`
        .chat-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(30px);
          border-radius: 20px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }


        .chat-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .chat-header h2 {
          color: white;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .online-users {
          margin-bottom: 15px;
        }

        .message-list {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 15px;
          margin-bottom: 20px;
          max-height: 400px;
          overflow-y:auto;
        }

        .message {
          margin-bottom: 10px;
        }

        .message span {
          color: #add8e6;
          font-weight: bold;
        }

        .message p {
          color: white;
          margin: 5px 0 0 20px;
        }

        .message-input {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .message-input input {
          flex-grow: 1;
          padding: 10px;
          border: none;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .message-input input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .message-input button {
          padding: 10px 20px;
          border: none;
          border-radius: 20px;
          background: #add8e6;
          color: #333;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .message-input button:hover {
          background: #8cc5d8;
        }

        .back-link {
          display: block;
          text-align: center;
          color: #add8e6;
          text-decoration: none;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .chat-container {
            margin: 10px;
            padding: 15px;
          }

          .chat-header h2 {
            font-size: 20px;
          }

          .message-input {
            flex-direction: column;
          }

          .message-input input,
          .message-input button {
            width: 100%;
          }
        }
          .leave-room-button {
          display: block;
          width: 100%;
          padding: 10px 20px;
          margin-top: 20px;
          border: none;
          border-radius: 20px;
          background: #ff6b6b;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.1s ease;
        }

        .leave-room-button:hover {
          background: #ff4757;
        }

        .leave-room-button:active {
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          /* ... (previous media query styles remain unchanged) */

          .leave-room-button {
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      
      `}</style>

      <div className="chat-header">
        <h2>Chat Room: {roomName || "Loading..."}</h2>
      </div>
      <OnlineUsers users={onlineUsers} />
      <div className="room-list">
        <RoomList />
      </div>
      {roomId ? (
        <>
          <div className="message-list">
            <MessageList
              messages={messages}
              isTyping={isTyping}
              typingUser={typingUser}
            />
          </div>
          <div className="message-input">
            <MessageInput
              onSendMessage={sendMessage}
              onTyping={handleTyping}
              onStopTyping={handleStopTyping}
            />
          </div>
          <button onClick={handleLeaveRoom} className="leave-room-button">
            Leave Room
          </button>
        </>
      ) : (
        <p className="select-room-message">Select a room to start chatting!</p>
      )}
    </div>
  );
}

export default ChatRoomPage;
