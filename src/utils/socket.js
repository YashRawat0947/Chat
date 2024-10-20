import { io } from 'socket.io-client';

const socket = io('https://chat-main-k557.onrender.com', {
  transports: ['websocket'],
});

export default socket;