import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});


  const validate = (data) => {
    const errors = {};
    if (!data.email.includes("@")) errors.email = "Please enter a valid email address";
    if (data.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const checkData = async (obj) => {
    const { email, password } = obj;
    const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${email.toLowerCase()}&password=${password}`;
    try {
      const response = await axios.get(urlApi);
      const result = response.data;
      if (result.ok) {
        notify("You logged in to your account successfully", "success");
      } else {
        notify("Your email or password is incorrect", "error");
      }
    } catch (error) {
      notify("Network error or invalid credentials", "error");
    }
  };

  const changeHandler = (event) => {
    const { name, value, checked, type } = event.target;
    setData({ ...data, [name]: type === "checkbox" ? checked : value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validate(data);
    if (Object.keys(errors).length === 0) {
      checkData(data);
    } else {
      notify("Please fill in all required fields", "error");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="E-mail"
            onChange={changeHandler}
            onFocus={focusHandler}
            autoComplete="off"
            aria-label="Email"
          />
          <img src={emailIcon} alt="email icon" />
          {touched.email && !data.email.includes("@") && <span className={styles.error}>Invalid email format</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={changeHandler}
            onFocus={focusHandler}
            autoComplete="off"
            aria-label="Password"
          />
          <img src={passwordIcon} alt="password icon" />
          {touched.password && data.password.length < 6 && <span className={styles.error}>Password too short</span>}
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have an account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
