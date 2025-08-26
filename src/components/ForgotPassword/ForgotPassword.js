import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {requestPasswordReset} from '../requests';
import play929Logo from '../Login/p.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', general: '' });
  const [success, setSuccess] = useState(false);
 


  const handleEmailChange = useCallback((e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9@._+-]/g, '');
    setEmail(value);
    setErrors(prev => ({ ...prev, email: '', general: '' }));
  }, []);

  const validateEmail = useCallback(() => {
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      return false;
    }
    return true;
  }, [email]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);
    try {
     
      await requestPasswordReset({
        email
       
      });

      setSuccess(true);
      setEmail('');
      sessionStorage.removeItem('csrfToken');
    } catch (error) {
      const message = error.response?.data?.message || 
                     error.message || 
                     'Failed to send reset instructions';
      setErrors(prev => ({ ...prev, general: message }));
    } finally {
      setLoading(false);
    }
  }, [email, validateEmail]);

  if (success) {
    return (
      <div style={pageStyles}>
        <div style={containerStyles}>
          <div style={leftPanelStyles}>
            <img 
              src={play929Logo} 
              alt="Play929 Logo" 
              style={logoStyles} 
              loading="lazy"
              width="80"
              height="80"
            />
            <h1 style={titleStyles}>Play929.com</h1>
            <p style={subtitleStyles}>
              Your security is our priority
            </p>
          </div>
          <div style={rightPanelStyles}>
            <div style={successContainerStyles}>
              <h2 style={successTitleStyles}>Reset Link Sent</h2>
              <p style={successTextStyles}>
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the link to reset your password.
              </p>
              <Link to="/login" style={backToLoginStyles}>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img 
            src={play929Logo} 
            alt="Play929 Logo" 
            style={logoStyles} 
            loading="lazy"
            width="80"
            height="80"
          />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>
            Your security is our priority
          </p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleSubmit} style={formStyles} noValidate>
            <h2 style={formTitleStyles}>Reset Your Password</h2>
            <p style={formSubtitleStyles}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {errors.general && (
              <div style={generalErrorStyles}>
                <span style={errorIconStyles}>⚠️</span> {errors.general}
              </div>
            )}

            <div style={inputContainer}>
            
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                style={inputStyles}
                disabled={loading}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-error" style={errorStyles}>{errors.email}</p>
              )}
            </div>

            <button 
              type="submit" 
              style={buttonStyles} 
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span style={buttonContentStyles}>
                  <span style={spinnerStyles} aria-hidden="true"></span>
                  Sending...
                </span>
              ) : 'Send Reset Link'}
            </button>

            <div style={backToLoginContainer}>
              <Link to="/login" style={backToLoginLinkStyles}>
                Remember your password? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reused styles from login with additions
const pageStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  padding: "20px",
};

const containerStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "980px",
  width: "100%",
  gap: "20px",
};

const leftPanelStyles = {
  flex: "1",
  minWidth: "300px",
  textAlign: "center",
  padding: "20px",
};

const titleStyles = {
  fontSize: "clamp(24px, 5vw, 40px)",
  color: "#1877f2",
  fontWeight: "700",
  marginBottom: "10px",
};

const logoStyles = {
  width: "80px",
  marginBottom: "10px",
  borderRadius: "16px",
};

const subtitleStyles = {
  fontSize: "clamp(14px, 2.5vw, 16px)",
  color: "#1c1e21",
  maxWidth: "400px",
  margin: "0 auto",
  lineHeight: "1.5",
};

const rightPanelStyles = {
  flex: "1",
  minWidth: "300px",
  maxWidth: "550px",
  display: "flex",
  justifyContent: "center",
};

const formStyles = {
  backgroundColor: "#fff",
  padding: "clamp(20px, 5vw, 30px)",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const formTitleStyles = {
  fontSize: "24px",
  color: "#1c1e21",
  marginBottom: "8px",
  fontWeight: "600",
};

const formSubtitleStyles = {
  fontSize: "14px",
  color: "#65676b",
  marginBottom: "20px",
  lineHeight: "1.5",
};

const inputContainer = {
  marginBottom: '15px',
  textAlign: 'left',
};

const labelStyles = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '500',
  color: '#1c1e21',
  fontSize: '14px',
};

const inputStyles = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "15px",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const buttonStyles = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#1877f2",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  marginTop: "10px",
  transition: "background-color 0.2s",
};

const buttonContentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const spinnerStyles = {
  border: "2px solid rgba(255,255,255,0.3)",
  borderRadius: "50%",
  borderTop: "2px solid #fff",
  width: "16px",
  height: "16px",
  animation: "spin 1s linear infinite",
};

const errorStyles = {
  color: "#e74c3c",
  fontSize: "13px",
  marginTop: "5px",
  textAlign: "left",
};

const generalErrorStyles = {
  backgroundColor: "#fef2f2",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "6px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
};

const errorIconStyles = {
  fontSize: "16px",
};

const backToLoginContainer = {
  marginTop: "20px",
  textAlign: "center",
};

const backToLoginLinkStyles = {
  color: "#1877f2",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  transition: "text-decoration 0.2s",
  '&:hover': {
    textDecoration: "underline",
  }
};

// Success view styles
const successContainerStyles = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const successTitleStyles = {
  fontSize: "24px",
  color: "#1877f2",
  marginBottom: "12px",
  fontWeight: "600",
};

const successTextStyles = {
  fontSize: "15px",
  color: "#1c1e21",
  lineHeight: "1.6",
  marginBottom: "20px",
};

const backToLoginStyles = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#1877f2",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  transition: "background-color 0.2s",
};

export default React.memo(ForgotPassword);