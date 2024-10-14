import React, { useEffect, useState } from "react";
import userIcon from "../img/user.svg";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import { validate } from "./validate";
import styles from "./SignUp.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import url from './ednpoint';

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const { name, value, checked, type } = event.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { name, surname, email, password, IsAccepted } = data;
    const urlApi = `${url}/api/Account/CreateAccount`;

    setLoading(true);

    toast.promise(
      axios.post(urlApi, {
        name,
        surname,
        email: email.toLowerCase(),
        password,
        terms: IsAccepted,
      }),
      {
        pending: "Creating your account...",
        success: "Account Created!",
        error: "Please check your fields!",
      }
    )
      .then((response) => {
        setLoading(false);
        const redirectLink = response.data.Link;
        setTimeout(() => {
          window.location.href = redirectLink;
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div style={pageStyles}>
      <header style={headerStyles}>
        <h1 style={isSmallScreen ? hiddenTitleStyles : titleStyles}>Play929.com</h1>
        <p style={isSmallScreen ? hiddenSloganStyles : sloganStyles}>Play and Win</p>
      </header>

      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off" style={formStyles}>
        <h2 style={formTitleStyles}>Create Account</h2>

        {/* Name Field */}
        <div>
          <div
            style={inputGroupStyles}
            className={
              errors.name && touched.name
                ? styles.unCompleted
                : !errors.name && touched.name
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={userIcon} alt="User icon" />
          </div>
          {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Surname Field */}
        <div>
          <div
            style={inputGroupStyles}
            className={
              errors.surname && touched.surname
                ? styles.unCompleted
                : !errors.surname && touched.surname
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="surname"
              value={data.surname}
              placeholder="Surname"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={userIcon} alt="Surname icon" />
          </div>
          {errors.surname && touched.surname && <span className={styles.error}>{errors.surname}</span>}
        </div>

        {/* Email Field */}
        <div>
          <div
            className={
              errors.email && touched.email
                ? styles.unCompleted
                : !errors.email && touched.email
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={emailIcon} alt="Email icon" />
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div>
          <div
            className={
              errors.password && touched.password
                ? styles.unCompleted
                : !errors.password && touched.password
                ? styles.completed
                : undefined
            }
          >
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="Password icon" />
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <div
            className={
              errors.confirmPassword && touched.confirmPassword
                ? styles.unCompleted
                : !errors.confirmPassword && touched.confirmPassword
                ? styles.completed
                : undefined
            }
          >
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            <img src={passwordIcon} alt="Confirm password icon" />
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        {/* Terms Checkbox */}
        <div>
          <div className={styles.terms} style={linkStyles}>
            <input
              type="checkbox"
              name="IsAccepted"
              checked={data.IsAccepted}
              id="accept"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>

        {/* Submit Button */}
        <div>
          {!loading && (
            <button type="submit" style={buttonStyles} disabled={loading}>
              Create Account
            </button>
          )}
          <span style={linkStyles}>
            Already have an account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>

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
};

const sloganStyles = {
  fontSize: "18px",
  color: "#66E7FF",
  marginTop: "4px",
};

const hiddenTitleStyles = { display: "none" };
const hiddenSloganStyles = { display: "none" };

const formStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#a8c2db",
  borderRadius: "15px 4px 15px",
};

const formTitleStyles = {
  marginBottom: "20px",
  color: "#333",
  fontSize: "28px",
  fontWeight: "bold",
};

const inputGroupStyles = {
  width: "100%",
  marginBottom: "15px",
};

const buttonStyles = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const linkStyles = {
  marginTop: "12px",
  color: "#333",
};

export default SignUp;
