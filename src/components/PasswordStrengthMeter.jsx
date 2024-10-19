import React from "react";
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: (password?.length ?? 0) >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password ?? "") },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password ?? "") },
    { label: "Contains a number", met: /\d/.test(password ?? "") },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password ?? "") },
  ];

  return (
    <div style={styles.criteriaContainer}>
      {criteria.map((item) => (
        <div key={item.label} style={styles.criteriaItem}>
          {item.met ? (
            <Check style={{ ...styles.icon, color: "white" }} />
          ) : (
            <X style={{ ...styles.icon, color: "white" }} />
          )}
          <span style={{ color: "white" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password = "" }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.text}>Password Strength:</span>
        <span style={styles.text}>{getStrengthText(strength)}</span>
      </div>
      <div style={styles.strengthMeter}>
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full  transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

const styles = {
  container: {
    marginTop: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  text: {
    fontSize: '12px',
    color: 'white',
  },
  strengthMeter: {
    display: 'flex',
    gap: '4px',
  },
  criteriaContainer: {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  criteriaItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    color: 'white',
  },
  icon: {
    height: '16px',
    width: '16px',
    marginRight: '8px',
  },
};

export default PasswordStrengthMeter;
