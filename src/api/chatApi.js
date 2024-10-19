// src/api/chatApi.js
import axios from 'axios';

const API_URL = 'https://chat-sooty-tau.vercel.app/api/chat'; // Your backend API URL


export const fetchRooms = async () => {
  const response = await axios.get(`${API_URL}/room`);
  return response.data;
};

export const fetchRoomMessages = async (roomId) => {
  const response = await axios.get(`${API_URL}/room/${roomId}/messages`);
  return response.data;
};

export const createRoom = async (roomName) => {
  const response = await axios.post(`${API_URL}/room`, { name: roomName });
  return response.data;
};
