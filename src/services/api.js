import axios from 'axios'

const api = axios.create({
  baseURL: 'https://chat-main-k557.onrender.com/api',
})

export default api