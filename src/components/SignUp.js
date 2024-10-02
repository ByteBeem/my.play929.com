import React, { useEffect, useState } from "react";

import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";

import { validate } from "./validate";

import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";

import { Link } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

   const [isSmallScreen, setIsSmallScreen] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      // Pushing data to database usuing PHP script
      const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email.toLowerCase()}&password=${data.password}&register=true`;
      const pushData = async () => {
        const responseA = axios.get(urlApi);
        const response = await toast.promise(responseA, {
          pending: "Creating Your Account...",
          success: "Checked!",
          error: "Something went wrong!",
        });
        if (response.data.ok) {
          notify("You signed Up successfully", "success");
        } else {
          notify("You have already registered, log in to your account", "warning");
        }
      };
      pushData();
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  return (
    <div style={pageStyles}>
      <header style={headerStyles}>
        <h1 style={isSmallScreen ? hiddenTitleStyles : titleStyles}>Play929.com</h1>
        <p style={isSmallScreen ? hiddenSloganStyles : sloganStyles}>Play and Win</p>
      </header>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
      <h2 style={formTitleStyles}>Create Account</h2>
        <div>
          <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
            <input type="text" name="name" value={data.name} placeholder="Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={userIcon} alt="" />
          </div>
          {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>
        <div>
          <div className={styles.terms} style={linkStyles}>
            <input type="checkbox" name="IsAccepted" value={data.IsAccepted} id="accept" onChange={changeHandler} onFocus={focusHandler} />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit" style={buttonStyles}>Create Account</button>
          <span style={linkStyles}>
            Already have a account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>

      <div style={isSmallScreen ? verticalFeaturesContainer : horizontalFeaturesContainer}>
        <div style={featureCard}>
          <h3>Instant Withdrawals</h3>
          <p>Fast , Safe and Secure Withdrawals!</p>
        </div>
        <div style={featureCard}>
          <h3>Secure Transactions</h3>
          <p>Your data is protected with top-tier security.</p>
        </div>
        <div style={featureCard}>
          <h3>24/7 Support</h3>
          <p>We're here to assist you at any time.</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
const pageStyles = {
  background: "linear-gradient(to right, #141E30, #243B55)", 
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};

const headerStyles = {
  position: "absolute",
  top: "10px",
  left: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const titleStyles = {
  fontSize: "30px",
  color: "#00C6FF",
  fontWeight: "bold",
  marginBottom: "0px",
};

const sloganStyles = {
  fontSize: "18px",
  color: "#66E7FF",
  marginTop: "4px",
};


const hiddenTitleStyles = {
  display: "none",
};

const hiddenSloganStyles = {
  display: "none",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor:'#fff',
  borderRadius:'15px 4px 15px'
};

const formTitleStyles = {
  marginBottom: "20px",
  color: "#333",  
  textAlign: "center",
  fontSize: "28px",  
  fontWeight: "bold",  
  letterSpacing: "1px",  
};

const inputGroupStyles = {
  width: "100%",
};

const inputStyles = {
  width: "100%",  
  padding: "12px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "2px solid #999",  
  outline: "none",
  fontSize: "16px",
  backgroundColor: "#f7f7f7",  
  color: "#333",  
  transition: "border-color 0.3s ease", 
};

const buttonStyles = {
  backgroundColor: "#333",  
  color: "#fff",  
  border: "none",
  padding: "12px 25px",
  borderRadius: "25px",
  cursor: "pointer",
  marginTop: "10px",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
  width: "100%", 
};

const linkStyles = {
  color: "#333",
  textAlign: "center",
  display: "inline-block",
  width: "100%",
  marginTop: "10px",
};

const linkTextStyles = {
  color: "#00C6FF",
};

const horizontalFeaturesContainer = {
  display: "flex",
  flexDirection: "row",  
  justifyContent: "space-between",
  marginTop: "30px",
  width: "80%",
  maxWidth: "800px",
  gap: "20px",
};


const verticalFeaturesContainer = {
  display: "flex",
  flexDirection: "column",  
  alignItems: "center",
  marginTop: "30px",
  width: "80%",
  maxWidth: "800px",
  gap: "20px",
};

const featureCard = {
  backgroundColor: "#243B55",
  borderRadius: "10px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  width: "100%",  
  marginBottom: "20px", 
};

export default SignUp;
