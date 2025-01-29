import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../requests";
import play929Logo from "./p.png";
import { validate } from "../validate";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const validationErrors = validate(formData, '');

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await loginUser(formData.email, formData.password); 
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img src={play929Logo} alt="Play929 Logo" style={logoStyles} />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>Your security is our priority – play with confidence.</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleLogin} style={formStyles}>
            <div style={inputContainerStyles}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={inputStyles}
              />
              {errors.email && <p style={errorStyles}>{errors.email}</p>}
            </div>

            <div style={inputContainerStyles}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={inputStyles}
              />
              {errors.password && <p style={errorStyles}>{errors.password}</p>}
            </div>

            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            <Link to="/reset" style={forgotPasswordStyles}>
              Forgot password?
            </Link>
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
  minWidth: "320px",
  display: "flex",
  justifyContent: "center",
};

const formStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
};

const inputContainerStyles = {
  marginBottom: "15px"
};

const inputStyles = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "14px",
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

const forgotPasswordStyles = {
  display: "block",
  marginTop: "10px",
  color: "#1877f2",
  textDecoration: "none",
  fontSize: "14px",
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

// Responsive Design using Media Queries
const styles = document.createElement("style");
styles.innerHTML = `
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
    .leftPanel {
      text-align: center;
    }
    .form {
      width: 90%;
      max-width: 360px;
    }
    .title {
      font-size: 32px;
    }
    .subtitle {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .form {
      width: 100%;
      padding: 15px;
    }
    .input {
      font-size: 14px;
    }
    .button {
      font-size: 14px;
    }
  }
`;
document.head.appendChild(styles);

export default Login;
