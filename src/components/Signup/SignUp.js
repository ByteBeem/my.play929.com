import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CreateAccount } from "../requests"; 
import play929Logo from "../Login/p.png";
import { countries } from "countries-list";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "South Africa", 
  });

// Generate country list with South Africa first
const allCountries = ["South Africa", 
  ...Object.values(countries).map(c => c.name).sort().filter(c => c !== "South Africa")
];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.surname.trim()) newErrors.surname = "Surname is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
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
          <p style={subtitleStyles}>Your security is our priority – Create your Play929 account.</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleSignUp} style={formStyles}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name(s)" required style={inputStyles} />
            {errors.name && <p style={errorStyles}>{errors.name}</p>}

            <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname (Last Name)" required style={inputStyles} />
            {errors.surname && <p style={errorStyles}>{errors.surname}</p>}

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={inputStyles} />
            {errors.email && <p style={errorStyles}>{errors.email}</p>}

            <select name="country" value={formData.country} onChange={handleChange} required style={inputStyles}>
              {allCountries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>

            <button type="submit" style={buttonStyles} disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            <hr style={dividerStyles} />
            <Link to="/login" style={signupButtonStyles}>Have an account? Log In</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageStyles = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px" };
const containerStyles = { display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", maxWidth: "980px", width: "100%", gap: "20px" };
const leftPanelStyles = { flex: "1", minWidth: "300px", textAlign: "center", padding: "20px" };
const titleStyles = { fontSize: "clamp(24px, 5vw, 40px)", color: "#1877f2", fontWeight: "bold", marginBottom: "10px" };
const logoStyles = { width: "80px", marginBottom: "10px", borderRadius: "16px" };
const subtitleStyles = { fontSize: "clamp(14px, 2.5vw, 16px)", color: "#1c1e21", maxWidth: "400px", margin: "0 auto" };
const rightPanelStyles = { flex: "1", minWidth: "300px", maxWidth: "550px", display: "flex", justifyContent: "center" };
const formStyles = { backgroundColor: "#fff", padding: "clamp(20px, 5vw, 45px)", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", width: "100%", maxWidth: "600px", textAlign: "center" };
const inputStyles = { flex: "2", padding: "12px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "14px", textAlign: "center", width: "100%", marginBottom: "15px" };
const buttonStyles = { width: "100%", padding: "12px", backgroundColor: "#1877f2", color: "#fff", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer" };
const dividerStyles = { margin: "20px 0", border: "0.5px solid #ddd" };
const signupButtonStyles = { display: "inline-block", padding: "12px 20px", backgroundColor: "#42b72a", color: "#fff", fontSize: "16px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" };
const errorStyles = { color: "red", fontSize: "12px", marginTop: "5px" };

export default SignUp;
