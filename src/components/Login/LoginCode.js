import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import play929Logo from "./p.png";

const SignInCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const student = params.get("student");
    const accessToken = params.get("access_token");
    if (student) setStudentNumber(student);
    if (accessToken) setToken(accessToken);
  }, [location]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://your-api.com/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentNumber, code }),
      });

      if (!response.ok) throw new Error("Invalid code. Please try again.");
      
      console.log("Code verified successfully");
    } catch (err) {
      setError(err.message);
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
          <form onSubmit={handleSubmit} style={formStyles}>
            <h2 style={headerStyles}>
              Enter the Sign-in code sent to {studentNumber}@keyaka.ul.ac.za
            </h2>
            <div style={inputContainerStyles}>
              <input
                type="text"
                value={code}
                onChange={handleChange}
                placeholder="Enter Code"
                required
                style={inputStyles}
              />
              {error && <p style={errorStyles}>{error}</p>}
            </div>
            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Verifying..." : "Submit"}
            </button>
            <Link to="/resend" style={forgotPasswordStyles}>
              Resend Code
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

const headerStyles = { fontSize: "18px", marginBottom: "10px", textAlign: "center" };
const inputContainerStyles = { marginBottom: "15px" };
const inputStyles = { width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px" };
const buttonStyles = { width: "100%", padding: "12px", backgroundColor: "#1877f2", color: "#fff", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer" };
const forgotPasswordStyles = { display: "block", marginTop: "10px", color: "#1877f2", textDecoration: "none", fontSize: "14px" };
const errorStyles = { color: "red", fontSize: "12px", marginTop: "5px" };

export default SignInCode;
