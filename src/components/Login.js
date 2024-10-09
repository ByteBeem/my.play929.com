import React, { useState , useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false); 

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600); 
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const checkData = (obj) => {
    const { email, password } = obj;
    const urlApi = "https://play929-0d1c32006aaf.herokuapp.com/auth/login"; 
  
    setLoading(true); 
  
    toast.promise(
      axios.post(urlApi, {
        email: email.toLowerCase(),
        password: password,
      }),
      {
        pending: "Logging you in...",
        success: {
          render({ data }) {
            setLoading(false);

            if(data.status ==- 200){
            const redirectLink = response.data.link;
        
            setTimeout(() => {
              window.location.href = redirectLink; 
            }, 2000); 
            }
          return "";
          }
        },
        error: {
          render({ data }) {
            setLoading(false);
  
           
            if (data && data.response) {
              const { status, data: errorData } = data.response;
  
              if (status === 401) {
                return "Incorrect Email or Password.";
              } else if (status === 404) {
                return "The user could not be found.";
              } else if (status === 500) {
                return "Internal Server Error: Please try again later.";
              } else {
                return errorData.message || "An unexpected error occurred.";
              }
            }
  
            return "Network error: Please check your internet connection.";
          }
        }
      }
    );
  };
  
  
  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkData(data);
  };

  return (
    <div style={pageStyles}>
      <header style={headerStyles}>
        <h1 style={isSmallScreen ? hiddenTitleStyles : titleStyles}>Play929.com</h1>
        <p style={isSmallScreen ? hiddenSloganStyles : sloganStyles}>Play and Win</p>
      </header>

      <form className="formLogin" onSubmit={submitHandler} autoComplete="off" style={formStyles}>
        <h2 style={formTitleStyles}>Log In</h2>
        <div>
          <div style={inputGroupStyles}>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Enter Email"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
              style={inputStyles}
            />
          </div>
        </div>
        <div>
          <div style={inputGroupStyles}>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Enter Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
              style={inputStyles}
            />
          </div>
        </div>

        <div>
          {!loading && ( 
            <button type="submit" style={buttonStyles}>
              Login
            </button>
          )}
          <span style={linkStyles}>
            Don't have an account? <Link to="/signup" style={linkTextStyles}>Create account</Link>
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
  backgroundColor:'#a8c2db',
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
  color: "#333",
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

export default Login;
