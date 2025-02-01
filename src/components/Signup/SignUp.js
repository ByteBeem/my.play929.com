import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateAccount } from "../requests"; 
import play929Logo from "../Login/p.png";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    studentNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!formData.surname.trim()) {
      setErrors({ surname: "Surname is required" });
      return;
    }

    if (!formData.studentNumber.trim()) {
      setErrors({ studentNumber: "Student Number is required" });
      return;
    }

    setLoading(true);
    try {
      await CreateAccount(formData); 
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
          <form onSubmit={handleSignUp} style={formStyles}>
            <div style={inputRowStyles}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                style={inputStyles}
              />
            </div>
            {errors.name && <p style={errorStyles}>{errors.name}</p>}

            <div style={inputRowStyles}>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Enter your surname"
                required
                style={inputStyles}
              />
            </div>
            {errors.surname && <p style={errorStyles}>{errors.surname}</p>}

            <div style={inputRowStyles}>
              <input
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                placeholder="Enter your student number"
                required
                style={inputStyles}
                inputMode="numeric"
              />
            </div>
            {errors.studentNumber && <p style={errorStyles}>{errors.studentNumber}</p>}

            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <hr style={dividerStyles} />
            <Link to="/login" style={signupButtonStyles}>
              Already have an account? Log In
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
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
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

export default SignUp;
