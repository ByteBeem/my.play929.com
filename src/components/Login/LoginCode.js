import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import play929Logo from "./p.png";
import {resendCode, verifyCode} from "../requests";

const SignInCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResend , setloadingResend]=useState(false);
  const [error, setError] = useState("");
  const [Email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("user");
    const accessToken = params.get("sid");
    if (email) setEmail(email);
    if (accessToken) setToken(accessToken);
  }, [location]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyCode(Email , code , token)
      
    } catch (error) {
      if (error?.error) {
        setError(error.error); 
      } else if (error?.message) {
        setError(error.message); 
      } else {
        setError("An unexpected error occurred.");
      }
  
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async(event)=>{
    event.preventDefault();
    setError("");
    setloadingResend(true);

    try {
      await resendCode(Email , token)
      
    } catch (error) {
      if (error?.error) {
        setError(error.error); 
      } else if (error?.message) {
        setError(error.message); 
      } else {
        setError("An unexpected error occurred.");
      }
  
    } finally {
      setloadingResend(false);
    }

  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img src={play929Logo} alt="Play929 Logo" style={logoStyles} />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>Your security is our priority – Please check your email.</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleSubmit} style={formStyles}>
            <h1 style={headerStyles}>
              Enter the Sign-in code sent to {Email}
            </h1>
            <div style={inputContainerStyles}>
              <input
                type="text"
                value={code}
                onChange={handleChange}
                placeholder="Enter Code"
                required
                style={inputStyles}
                disabled = {loading}
              />
              {error && <p style={errorStyles}>{error}</p>}
            </div>
            {!loading && (
              <>
            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Verifying..." : "Submit"}
            </button>
            {!loadingResend && (
              <>
            <button onClick={handleResend} style={forgotPasswordStyles}>
              Resend Code
            </button>
            </>
          )}
            </>
        )}
          {loading && <p style={loadingStyles}>Validating, please wait...</p>}
          {loadingResend && <p style={loadingStyles}>Resending code, please wait...</p>}
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

const loadingStyles = { color: "#1877f2", fontSize: "16px", fontWeight: "bold", marginTop: "15px" };


const titleStyles = {
  fontSize: "clamp(24px, 5vw, 40px)", 
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

const headerStyles = { fontSize: "15px", marginBottom: "15px", textAlign: "center" };
const inputContainerStyles = { marginBottom: "15px" };
const buttonStyles = { width: "100%", padding: "12px", backgroundColor: "#1877f2", color: "#fff", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer" };
const forgotPasswordStyles = { display: "block", marginTop: "10px", color: "#1877f2", textDecoration: "none", fontSize: "14px" };
const errorStyles = { color: "red", fontSize: "12px", marginTop: "5px" };

export default SignInCode;
