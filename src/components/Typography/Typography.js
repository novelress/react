import React from "react";
import "./Typography.css";

const Typography = ({ fontSize, onClick }) => {
  const textStyle = {
    fontSize: fontSize,
  };

  return (
    <p onClick={onClick} style={textStyle} className="typography">
      Привет
    </p>
  );
};

export default Typography;


