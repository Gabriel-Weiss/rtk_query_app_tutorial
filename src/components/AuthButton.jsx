import React from "react";
import "./css/AuthButton.css";

const AuthButton = ({ handleClick, text }) => {
  return (
    <button className="addBtn" onClick={handleClick}>
      {text}
    </button>
  );
};

export default AuthButton;
