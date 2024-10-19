import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p style={styles.description}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              style={styles.button}
              type="submit"
            >
              {isLoading ? <Loader style={styles.loader} /> : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div style={styles.submittedMessage}>
            <div style={styles.iconWrapper}>
              <Mail style={styles.mailIcon} />
            </div>
            <p style={styles.confirmationText}>
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <Link to={"/login"} style={styles.backLink}>
          <ArrowLeft style={styles.backIcon} /> Back to Login
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)', // Adds blur effect for glassmorphism
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)', // Soft shadow
    overflow: 'hidden',
    margin: '0 auto',
  },
  content: {
    padding: '32px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #4ade80, #34d399)', // Gradient text effect
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  description: {
    color: '#D1D5DB', // Light gray text
    marginBottom: '24px',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    background: 'linear-gradient(to right, #22c55e, #16a34a)',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 4px 14px rgba(0, 128, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    border: 'none',
  },
  loader: {
    display: 'block',
    margin: '0 auto',
    animation: 'spin 1s linear infinite',
  },
  submittedMessage: {
    textAlign: 'center',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    backgroundColor: '#10B981', // Green background
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 16px auto',
  },
  mailIcon: {
    height: '32px',
    width: '32px',
    color: 'white',
  },
  confirmationText: {
    color: '#D1D5DB',
    marginBottom: '24px',
  },
  footer: {
    padding: '16px 32px',
    backgroundColor: 'rgba(17, 24, 39, 0.5)', // Footer background
    display: 'flex',
    justifyContent: 'center',
  },
  backLink: {
    color: '#34D399', // Green text
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  backIcon: {
    marginRight: '8px',
  },
};

export default ForgotPasswordPage;
