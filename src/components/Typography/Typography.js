import React from "react";
import "./Typography.css";

const Typography = ({ size }) => {
  return (
    <p className={`typography typography__size_${size}`}>
      Привет
    </p>
  );
};

export default Typography;



