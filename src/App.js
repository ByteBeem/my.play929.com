import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import SignInCode from "./components/Login/LoginCode";
import Two_FA from "./components/MFA/2fa";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignInCode" element={<SignInCode />} />
        <Route path="/mfa" element={<Two_FA />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
