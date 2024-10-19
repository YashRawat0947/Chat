import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

const GlassmorphicCard = ({ children }) => (
  <div className="glassmorphic-card">{children}</div>
);

function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/chat/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      await api.post("/chat/room", { name: newRoomName });
      setNewRoomName("");
      fetchRooms();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="room-list-container">
      <GlassmorphicCard>
        <h2 className="title">Chat Rooms</h2>
        <ul className="room-list">
          {rooms.map((room) => (
            <li key={room._id}>
              <Link to={`/room/${room._id}`} className="room-link">
                {room.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="create-room">
          <input
            type="text"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            placeholder="New room name"
            className="input"
          />
          <button onClick={createRoom} className="button">
            Create Room
          </button>
        </div>
        <Link to="/" className="feature-link back-link">
          Back to Home
        </Link>
      </GlassmorphicCard>
      <style>{`
        .room-list-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: "Poppins", sans-serif;
          color: white;
        }

        .glassmorphic-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(40px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
          width: 100%;
          max-width: 400px;
          transition: transform 0.3s ease;
        }

        .glassmorphic-card:hover {
          transform: translateY(-5px);
        }

        .title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #ffffff;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .room-list {
          list-style-type: none;
          padding: 0;
          margin-bottom: 1.5rem;
        }

        .room-link {
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s;
          display: block;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 8px;
          background: rgba(255, 255, 255, 0.1);
        }

        .room-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .create-room {
          display: flex;
          margin-bottom: 1.5rem;
        }

        .input {
          flex-grow: 1;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          text-align: center;
          // padding: 12px 15px;
          border: none;
          border-radius: 8px 0 0 8px;
          outline: none;
          transition: background-color 0.3s;
        }

        .input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .input:focus {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .button {
          background-color: #ff6b6b;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 0 8px 8px 0;
          cursor: pointer;
          transition: all 0.3s;
        }

        .button:hover {
          background-color: #ee5253;
          transform: translateY(-2px);
        }

        .feature-link {
          display: inline-block;
          text-align: center;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s;
          padding: 10px 20px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 15px;
          font-weight: 500;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .feature-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .back-link {
          background: linear-gradient(45deg, #ff9a9e, #fad0c4);
          margin-top: 10px;
        }

        .back-link:hover {
          background: linear-gradient(45deg, #ff9a9e, #fad0c4);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}

export default RoomListPage;
