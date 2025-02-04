import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../requests";
import play929Logo from "./p.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    Email: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.replace(/[^a-zA-Z0-9@._-]/g, ""),
    }));
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    setErrors("");

    if (!formData.Email.trim()) {
      setErrors({ Email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      await loginUser(formData.Email);
    } catch (error) {
      if (error?.error) {
          setErrors(error.error); 
      } else if (error?.message) {
          setErrors(error.message); 
      } else {
          setErrors("An unexpected error occurred.");
      }
  
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img src={play929Logo} alt="Play929 Logo" style={logoStyles} loading="lazy" />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>Your security is our priority – Login to Play, Goodluck!</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleLogin} style={formStyles}>
            <div style={inputRowStyles}>
              <input
                type="text"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={inputStyles}
              />
            </div>
            {errors.Email && <p style={errorStyles}>{errors.Email}</p>}

            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <hr style={dividerStyles} />
            <Link to="/signup" style={signupButtonStyles}>
              Create New Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
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
  fontSize: "clamp(24px, 5vw, 40px)", // Responsive font size
  color: "#1877f2",
  fontWeight: "bold",
  marginBottom: "10px",
};

const logoStyles = {
  width: "80px",
  marginBottom: "10px",
  borderRadius: "16px",
};

const subtitleStyles = {
  fontSize: "clamp(14px, 2.5vw, 16px)", // Responsive font size
  color: "#1c1e21",
  maxWidth: "400px",
  margin: "0 auto",
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
  padding: "clamp(20px, 5vw, 45px)", // Responsive padding
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const inputRowStyles = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  marginBottom: "15px",
};

const inputStyles = {
  flex: "2",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  textAlign: "center",
  width: "100%",
};

const buttonStyles = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1877f2",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const dividerStyles = {
  margin: "20px 0",
  border: "0.5px solid #ddd",
};

const signupButtonStyles = {
  display: "inline-block",
  padding: "12px 20px",
  backgroundColor: "#42b72a",
  color: "#fff",
  fontSize: "16px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};

const errorStyles = {
  color: "red",
  fontSize: "12px",
  marginTop: "5px",
};

export default React.memo(Login);