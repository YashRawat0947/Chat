import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "https://chat-main-k557.onrender.com/api/auth";
const socket = io("https://chat-main-k557.onrender.com", {
  autoConnect: false,
  withCredentials: true
});

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  socket: null,

  connectSocket: () => {
    socket.connect();
    set({ socket });
    
    socket.on("auth_success", (user) => {
      set({ user, isAuthenticated: true });
    });

    socket.on("auth_failure", (errorMessage) => {
      set({ error: errorMessage });
    });

    socket.on("disconnect", () => {
      set({ user: null, isAuthenticated: false });
    });
  },

  signup: async (email, name, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        name,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      socket.emit("user_signup", { email, name });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      });

      socket.emit("user_login", { email });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error in logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });

      socket.emit("user_logout");
      socket.disconnect();
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      if (!socket.connected) {
        socket.connect();
      }
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        error: null, 
        isCheckingAuth: false 
      });
      if (socket.connected) {
        socket.disconnect();
      }
    }
  },
  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error sending reset password email"
      });
    }
  },
  
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password"
      });
      throw error;
    }
  }
}));