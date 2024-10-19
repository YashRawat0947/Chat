import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

// Import your pages here...
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RoomListPage from "./pages/RoomListPage";
import ChatRoomPage from "./pages/ChatRoomPage";

// Centralized Route Wrapper for Protected and Public routes
const RouteWrapper = ({ isProtected, element: Element }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isProtected && isAuthenticated && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (!isProtected && isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Element />;
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Animated background component for visual effects (unchanged)
const AnimatedBackground = () => (
  <div className="animated-background">
    {[...Array(10)].map((_, index) => (
      <div key={index} className="floating-circle" />
    ))}
  </div>
);

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="app-container">
        <AnimatedBackground />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="app-container">
      <AnimatedBackground />
      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={<RouteWrapper isProtected={true} element={HomePage} />}
          />
          <Route
            path="/signup"
            element={<RouteWrapper isProtected={false} element={SignUpPage} />}
          />
          <Route
            path="/login"
            element={<RouteWrapper isProtected={false} element={LoginPage} />}
          />
          <Route
            path="/verify-email"
            element={<RouteWrapper isProtected={false} element={EmailVerificationPage} />}
          />
          <Route
            path="/forgot-password"
            element={<RouteWrapper isProtected={false} element={ForgotPasswordPage} />}
          />
          <Route
            path="/reset-password/:token"
            element={<RouteWrapper isProtected={false} element={ResetPasswordPage} />}
          />
          <Route
            path="/rooms"
            element={<RouteWrapper isProtected={true} element={RoomListPage} />}
          />
          <Route
            path="/room/:roomId"
            element={<RouteWrapper isProtected={true} element={ChatRoomPage} />}
          />
        </Routes>
      </div>
      <Toaster />
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .content-container {
          display: flex;
          z-index: 1;
          width: 100%;
          max-width: 1200px;
          justify-content: center;
          padding: 20px;
        }

        .animated-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .floating-circle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 15s infinite;
          animation-delay: calc(var(--i) * -2s);
        }

        .floating-circle:nth-child(1) { --i: 0; width: 80px; height: 80px; top: 10%; left: 10%; }
        .floating-circle:nth-child(2) { --i: 1; width: 60px; height: 60px; top: 20%; right: 20%; }
        .floating-circle:nth-child(3) { --i: 2; width: 100px; height: 100px; bottom: 30%; left: 30%; }
        .floating-circle:nth-child(4) { --i: 3; width: 50px; height: 50px; bottom: 10%; right: 10%; }
        .floating-circle:nth-child(5) { --i: 4; width: 70px; height: 70px; top: 50%; left: 50%; }
        .floating-circle:nth-child(6) { --i: 5; width: 90px; height: 90px; top: 70%; right: 30%; }
        .floating-circle:nth-child(7) { --i: 6; width: 40px; height: 40px; bottom: 50%; left: 20%; }
        .floating-circle:nth-child(8) { --i: 7; width: 120px; height: 120px; top: 30%; right: 50%; }
        .floating-circle:nth-child(9) { --i: 8; width: 55px; height: 55px; bottom: 40%; right: 40%; }
        .floating-circle:nth-child(10) { --i: 9; width: 85px; height: 85px; top: 60%; left: 40%; }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 4px solid #ffffff;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;