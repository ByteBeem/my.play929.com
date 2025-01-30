import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "../validate";
import { CreateAccount } from "../requests";

const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
    surname: "",
    email: "",
    country: "South Africa",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
   
      setLoading(true);
      try {
        await CreateAccount(data);
        setLoading(false);
       
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="titleStyles">Play929.com</h1>
        <h2>Create a New Account</h2>
        <p>It's quick and easy.</p>
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name(s)"
                value={data.fullName}
                onChange={changeHandler}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={data.surname}
                onChange={changeHandler}
              />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={changeHandler}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="country-group">
            <select name="country" value={data.country} onChange={changeHandler}>
              <option value="South Africa">South Africa</option>
              <option value="Other">Other</option>
            </select>
            <img src="../SA.png" alt="SA Flag" className="flag-icon" />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={changeHandler}
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={changeHandler}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <p className="terms-text">
            By registering, I declare that I have carefully read, understood, and
            accepted the entire text of the Company's Legal Documents and Privacy Policy.
            I further understand that I will receive newsletters, company news, and product updates.
          </p>
          <button type="submit" className="create-account-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <Link to="/login" className="login-link">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

// CSS Fixes
const styles = ` 
  body {
    background-color: #f0f2f5;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .signup-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
    text-align: center;
  }

  .titleStyles {
    font-size: 36px;
    color: #1877f2;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    text-align: left;
  }

  .signup-box h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .signup-box p {
    font-size: 16px;
    color: #606770;
    margin-bottom: 20px;
  }

  .input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  input[type="text"], input[type="email"], input[type="password"], select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccd0d5;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .country-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flag-icon {
    width: 24px;
    height: 16px;
    margin-left: 8px;
  }

  .terms-text {
    font-size: 12px;
    color: #606770;
    margin-top: 10px;
    text-align: left;
  }

  .create-account-btn {
    background-color: #42b72a;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;
  }

  .create-account-btn:hover {
    background-color: #36a420;
  }

  .create-account-btn:disabled {
    background-color: #9ccf85;
    cursor: not-allowed;
  }

  .login-link {
    display: inline-block;
    margin-top: 15px;
    color: #1877f2;
    text-decoration: none;
    font-size: 14px;
  }

  .login-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .signup-container {
      padding: 15px;
    }

    .titleStyles {
      font-size: 28px;
    }

    .signup-box h2 {
      font-size: 20px;
    }

    .signup-box p {
      font-size: 14px;
    }

    .input-group {
      flex-direction: column;
      gap: 0;
    }

    .create-account-btn {
      padding: 12px;
      font-size: 14px;
    }
  }

  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Signup;
