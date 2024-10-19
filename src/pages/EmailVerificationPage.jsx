import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Auto Submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <h2 style={styles.heading}>
          Verify Your Email
        </h2>
        <p style={styles.description}>
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.codeContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1" // Changed to 1 for individual digit
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={styles.input}
              />
            ))}
          </div>
          {error && <p style={styles.errorText}>{error}</p>}
          <button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            style={isLoading || code.some((digit) => !digit) ? styles.buttonDisabled : styles.button}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)', // Shadow for depth
    overflow: 'hidden',
    margin: '0 auto',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
    padding: '32px',
    width: '100%',
    maxWidth: '400px',
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
    textAlign: 'center',
    color: '#D1D5DB', // Light gray color
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  codeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    width: '48px',
    height: '48px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'rgba(31, 41, 55, 0.5)', // Glassmorphic background

    color: 'white',
    border: '2px solid #4B5563', // Dark border
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.3s',
    ':focus': {
      borderColor: '#10B981', // Green focus color
    },
  },
  errorText: {
    color: '#F87171', // Red color for error
    fontWeight: 'bold',
    marginTop: '8px',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    background: 'linear-gradient(to right, #22c55e, #16a34a)', // Gradient button
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 4px 14px rgba(0, 128, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    border: 'none',
  },
  buttonDisabled: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(34, 197, 94, 0.5)', // Disabled button gradient
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 4px 14px rgba(0, 128, 0, 0.2)',
    border: 'none',
    cursor: 'not-allowed',
  },
};

export default EmailVerificationPage;
