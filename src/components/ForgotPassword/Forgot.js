import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ForgotPassword component
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset request for:', email);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password?</h1>
        <p>Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="reset-btn">Send Reset Link</button>
        </form>
        
        <div className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

// CSS styles as a string for the component
const styles = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}

/* Forgot Password Container */
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.forgot-password-box {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.forgot-password-box h1 {
  font-size: 28px;
  color: #1877f2;
  margin-bottom: 20px;
}

.forgot-password-box p {
  color: #555;
  font-size: 16px;
  margin-bottom: 30px;
}

/* Input and Button Styles */
.forgot-password-box input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccd0d5;
  border-radius: 5px;
  font-size: 14px;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background-color: #1877f2;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.reset-btn:hover {
  background-color: #1877f1;
}

/* Back to Login Link */
.back-to-login {
  margin-top: 10px;
}

.back-to-login a {
  color: #1877f2;
  text-decoration: none;
  font-size: 14px;
}

.back-to-login a:hover {
  text-decoration: underline;
}
`;

// Inject CSS styles dynamically into the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ForgotPassword;
