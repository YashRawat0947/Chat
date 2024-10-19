import { Loader, Lock, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, name, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Create Account</h2>

          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={styles.errorMessage}>{error}</p>}
            <PasswordStrengthMeter password={password} />

            <button style={styles.submitButton} type="submit" disabled={isLoading}>
              {isLoading ? <Loader style={styles.loaderIcon} size={24} /> : "Sign Up"}
            </button>
          </form>
        </div>
        <div style={styles.footer}>
          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to={"/login"} style={styles.loginLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    width: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
  },
  formContainer: {
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#4ade80',
  },
  errorMessage: {
    color: '#ff4136',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4ade80',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1.5rem',
  },
  loaderIcon: {
    display: 'block',
    margin: '0 auto',
    animation: 'spin 2s linear infinite',
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '1rem',
    textAlign: 'center',
  },
  loginText: {
    color: '#f5f5f5',
  },
  loginLink: {
    color: '#4ade80',
    textDecoration: 'none',
    fontWeight: 'bold',
  } 
};

export default SignUpPage;
