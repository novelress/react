import React from "react";
import "./Button.css";

const Button = ({ children, type, onClick }) => {
  return (
    <button onClick={onClick} className={`button button__${type}`}>
      {children}
    </button>
  );
}

export default Button;

