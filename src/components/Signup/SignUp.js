import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreateAccount } from "../requests";
import play929Logo from "../Login/p.png";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    idNumber: "",
    cellphone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    
    // Input sanitization based on field type
    if (name === "email") {
      sanitizedValue = value.replace(/[^a-zA-Z0-9@._+-]/g, "");
    } else if (name === "cellphone" || name === "idNumber") {
      sanitizedValue = value.replace(/\D/g, "");
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.surname.trim()) newErrors.surname = "Surname is required";
      if (!formData.idNumber.trim()) newErrors.idNumber = "ID Number is required";
      else if (formData.idNumber.length < 6) newErrors.idNumber = "ID Number is too short";
    }
    
    if (step === 2) {
      if (!formData.cellphone.trim()) newErrors.cellphone = "Cellphone is required";
      else if (formData.cellphone.length < 10) newErrors.cellphone = "Invalid phone number";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    }
    
    if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Include at least one uppercase letter";
      else if (!/[0-9]/.test(formData.password)) newErrors.password = "Include at least one number";
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      
      const submitData = {
        email: formData.email,
        surname: formData.surname,
        name: formData.name,
        idNumber: formData.idNumber,
        cellphone: formData.cellphone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
      await CreateAccount(submitData);
      // Handle success (redirect or show success message)
    } catch (error) {
       let message;

    if (error.response?.status === 429) {
      message = "Too many requests. Please slow down and try again later.";
    } else if (error.response?.data?.error) {
      message = error.response.data.error;
    } else if (error.error) {
      message = error.error;
    } 
      console.error("Signup error:", error);
      setErrors(prev => ({
        ...prev,
        general: message || "Registration failed. Please try again."
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 style={stepTitleStyles}>Personal Information</h2>
            <div style={inputContainer}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name(s)"
                required
                style={inputStyles}
                disabled={loading}
              />
              {errors.name && <p style={errorStyles}>{errors.name}</p>}

              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
                required
                style={inputStyles}
                disabled={loading}
              />
              {errors.surname && <p style={errorStyles}>{errors.surname}</p>}

              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="ID Number"
                required
                style={inputStyles}
                disabled={loading}
                maxLength="13"
              />
              {errors.idNumber && <p style={errorStyles}>{errors.idNumber}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 style={stepTitleStyles}>Contact Details</h2>
            <div style={inputContainer}>
              <input
                type="tel"
                name="cellphone"
                value={formData.cellphone}
                onChange={handleChange}
                placeholder="Cellphone Number"
                required
                style={inputStyles}
                disabled={loading}
                maxLength="10"
              />
              {errors.cellphone && <p style={errorStyles}>{errors.cellphone}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={inputStyles}
                disabled={loading}
              />
              {errors.email && <p style={errorStyles}>{errors.email}</p>}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 style={stepTitleStyles}>Account Security</h2>
            <div style={inputContainer}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={inputStyles}
                disabled={loading}
                minLength="8"
              />
              {errors.password && <p style={errorStyles}>{errors.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                style={inputStyles}
                disabled={loading}
                minLength="8"
              />
              {errors.confirmPassword && <p style={errorStyles}>{errors.confirmPassword}</p>}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        <div style={leftPanelStyles}>
          <img 
            src={play929Logo} 
            alt="Play929 Logo" 
            style={logoStyles}
            width="80"
            height="80"
            loading="lazy"
          />
          <h1 style={titleStyles}>Play929.com</h1>
          <p style={subtitleStyles}>New to Play929 - Create your account in {currentStep} simple steps</p>
          
          <div style={progressContainer}>
            {[1, 2, 3].map((step) => (
              <div 
                key={step}
                style={{
                  ...progressStep,
                  ...(currentStep >= step ? activeProgressStep : {}),
                  ...(currentStep === step ? currentProgressStep : {})
                }}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
        
        <div style={rightPanelStyles}>
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()} style={formStyles}>
            {errors.general && (
              <div style={generalErrorStyles}>
                <span style={errorIconStyles}></span> {errors.general}
              </div>
            )}
            
            {renderStep()}
            
            <div style={buttonGroupStyles}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={secondaryButtonStyles}
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={buttonStyles}
                  disabled={loading}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  style={buttonStyles}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              )}
            </div>
            
            <div style={loginPromptStyles}>
              <hr style={dividerStyles} />
                <Link to="/login" style={signupButtonStyles}>Have an account? Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Enhanced Styles
const pageStyles = { 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  minHeight: "100vh", 
  backgroundColor: "#f0f2f5", 
  padding: "20px" 
};

const dividerStyles = {
  margin: "25px 0",
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
  fontWeight: "600",
  width: "100%",
};

const containerStyles = { 
  display: "flex", 
  flexWrap: "wrap", 
  justifyContent: "center", 
  alignItems: "center", 
  maxWidth: "980px", 
  width: "100%", 
  gap: "20px" 
};

const leftPanelStyles = { 
  flex: "1", 
  minWidth: "300px", 
  textAlign: "center", 
  padding: "20px" 
};

const titleStyles = { 
  fontSize: "clamp(24px, 5vw, 40px)", 
  color: "#1877f2", 
  fontWeight: "bold", 
  marginBottom: "10px" 
};

const logoStyles = { 
  width: "80px", 
  marginBottom: "10px", 
  borderRadius: "16px" 
};

const subtitleStyles = { 
  fontSize: "clamp(14px, 2.5vw, 16px)", 
  color: "#1c1e21", 
  maxWidth: "400px", 
  margin: "0 auto 20px" 
};

const rightPanelStyles = { 
  flex: "1", 
  minWidth: "300px", 
  maxWidth: "550px", 
  display: "flex", 
  justifyContent: "center" 
};

const formStyles = { 
  backgroundColor: "#fff", 
  padding: "30px", 
  borderRadius: "8px", 
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
  width: "100%", 
  maxWidth: "500px", 
  textAlign: "center" 
};

const stepTitleStyles = {
  fontSize: "20px",
  color: "#1c1e21",
  marginBottom: "20px",
  fontWeight: "600"
};

const inputContainer = {
  marginBottom: "20px"
};

const inputStyles = { 
  width: "100%", 
  padding: "12px 15px", 
  borderRadius: "6px", 
  border: "1px solid #ddd", 
  fontSize: "15px", 
  marginBottom: "5px",
  boxSizing: "border-box"
};

const errorStyles = { 
  color: "#e74c3c", 
  fontSize: "13px", 
  margin: "0 0 15px 5px", 
  textAlign: "left" 
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
  fontSize: "14px"
};

const errorIconStyles = {
  fontSize: "16px"
};

const buttonGroupStyles = {
  display: "flex",
  gap: "10px",
  marginTop: "20px"
};

const buttonStyles = { 
  flex: 1,
  padding: "14px", 
  backgroundColor: "#1877f2", 
  color: "#fff", 
  fontSize: "16px", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer",
  fontWeight: "600",
  transition: "background-color 0.2s"
};

const secondaryButtonStyles = {
  flex: 1,
  padding: "14px", 
  backgroundColor: "#f0f2f5", 
  color: "#1c1e21", 
  fontSize: "16px", 
  border: "none", 
  borderRadius: "6px", 
  cursor: "pointer",
  fontWeight: "600",
  transition: "background-color 0.2s"
};

const loginPromptStyles = {
  marginTop: "20px",
  fontSize: "14px",
  color: "#65676b"
};

const loginLinkStyles = {
  color: "#1877f2",
  textDecoration: "none",
  fontWeight: "600"
};

const progressContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  margin: "20px 0"
};

const progressStep = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "#e4e6eb",
  color: "#65676b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  transition: "all 0.3s"
};

const activeProgressStep = {
  backgroundColor: "#1877f2",
  color: "white"
};

const currentProgressStep = {
  transform: "scale(1.1)",
  boxShadow: "0 0 0 2px #1877f2"
};

export default SignUp;