import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreateAccount } from "../requests"; 
import play929Logo from "../Login/p.png";
import axios from "axios";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
  });

  

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Swaziland", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", 
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
    if (!formData.country) newErrors.country = "Please select a country";

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
          <p style={subtitleStyles}>New to Play929 - Create your Play929 account today.</p>
        </div>
        <div style={rightPanelStyles}>
          <form onSubmit={handleSignUp} style={formStyles}>
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

            <select 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              required 
              style={inputStyles} 
              disabled={loading}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p style={errorStyles}>{errors.country}</p>}

            {!loading && (
              <>
                <button type="submit" style={buttonStyles}>
                  Create Account
                </button>
                <hr style={dividerStyles} />
                <Link to="/login" style={signupButtonStyles}>Have an account? Log In</Link>
              </>
            )}

            {loading && <p style={loadingStyles}>Creating account, please wait...</p>}
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
const loadingStyles = { color: "#1877f2", fontSize: "16px", fontWeight: "bold", marginTop: "15px" };

export default SignUp;
