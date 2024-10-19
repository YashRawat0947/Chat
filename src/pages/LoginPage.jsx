import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-card">
      <h2  className="login-title">Welcome Back</h2>
      <form onSubmit={handleLogin}>
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <div className="flex justify-end mb-6">
          <Link to="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        {error && <p className="error-message">{error}</p>}

        <button
          className="login-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
        </button>
      </form>
      <div className="signup-container">
        <p className="text-sm text-gray-300">
          Don't have an Account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
      <style >{`
        .login-card {
          max-width: 400px;
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease-out;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
        }

        .login-title {
          color: white;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
          background: linear-gradient(45deg, #4ade80, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 10px;
          padding: 12px 15px;
          margin-bottom: 15px;
          color: #fff;
          transition: all 0.3s ease;
        }

        .input-field:focus {
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.5);
        }

        .login-button {
          background: linear-gradient(45deg, #4ade80, #22c55e);
          border: none;
          border-radius: 10px;
          color: #fff;
          padding: 12px;
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          background: linear-gradient(45deg, #22c55e, #4ade80);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .forgot-password, .signup-link {
          color: white;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .forgot-password:hover, .signup-link:hover {
          color: #22c55e;
          text-decoration: underline;
        }

        .error-message {
          color: #ef4444;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .signup-container {
          margin-top: 20px;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;