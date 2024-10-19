import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const { roomId: currentRoomId } = useParams();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://chat-main-k557.onrender.com/api/chat/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <style jsx>{`
        .room-list-container {
          text-align: center;
          margin-bottom: 20px;
        }

        .room-list-title {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(45deg, #ff7e5f, #feb47b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .room-list {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .room-item {
          padding: 10px 20px;
          border-radius: 15px;
          margin-bottom: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background: none;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .room-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .room-link {
          color: #00c6ff;
          text-decoration: none;
          font-weight: bold;
          display: block;
          padding: 10px 20px;
          transition: color 0.3s ease;
          border-radius: 0px;
          background: none;
        }

        .room-link:hover {
          color: white;
          background: none;
        }
      `}</style>

      <div className="room-list-container">
        <h2 className="room-list-title">Other Available Chat Rooms</h2>
        {rooms.length > 0 ? (
          <ul className="room-list">
            {rooms
              .filter(room => room._id !== currentRoomId)
              .map((room) => (
                <li key={room._id} className="room-item">
                  <Link to={`/room/${room._id}`} className="room-link">
                    {room.name}
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <p>No other rooms available.</p>
        )}
      </div>
    </>
  );
}

export default RoomList;