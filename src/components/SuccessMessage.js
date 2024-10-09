import React from 'react';

const SuccessMessage = ({ email }) => {
  return (
    <div style={successStyles}>
      <h1>Account Created Successfully!</h1>
      <p>Check your <strong>{email}</strong> inbox for a verification link.</p>
    </div>
  );
};

const successStyles = {
  background: "linear-gradient(to right, #00C6FF, #0072FF)",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
};

export default SuccessMessage;
