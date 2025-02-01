import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../requests";
import play929Logo from "./p.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    studentNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.replace(/\D/g, ""), 
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.studentNumber.trim()) {
      setErrors({ studentNumber: "Student Number is required" });
      return;
    }

    setLoading(true);
    try {
      await loginUser(formData.studentNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img src={play929Logo} alt="Play929 Logo" style={logoStyles} />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>Your security is our priority – Learn with confidence.</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleLogin} style={formStyles}>
            <div style={inputRowStyles}>
              <input
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                placeholder="Student Number"
                required
                style={inputStyles}
                inputMode="numeric"
              />
              <span style={atSymbolStyles}>@</span>
              <input type="text" value="Keyaka.ul.ac.za" readOnly style={readonlyInputStyles} />
            </div>
            {errors.studentNumber && <p style={errorStyles}>{errors.studentNumber}</p>}

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
  height: "100vh",
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
  fontSize: "40px",
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
  fontSize: "16px",
  color: "#1c1e21",
  maxWidth: "400px",
  margin: "0 auto",
};

const rightPanelStyles = {
  flex: "1",
  minWidth: "550px",
  display: "flex",
  justifyContent: "center",
};

const formStyles = {
  backgroundColor: "#fff",
  padding: "45px",
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
};

const atSymbolStyles = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const readonlyInputStyles = {
  flex: "3",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
  backgroundColor: "#f8f9fa",
  textAlign: "center",
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

export default Login;
