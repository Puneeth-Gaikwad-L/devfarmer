import React from "react";
import "./backgrounds.css";

const StarBackground = ({ children }) => {
  return (
    <div className="starry-container">
      <div className="stars"></div>
      {/* Multiple shooting stars */}
      {Array.from({ length: 85 }).map((_, index) => (
        <div key={index} className="shooting-star"></div>
      ))}
      {/* Content goes on top */}
      <div className="starry-content">{children}</div>
    </div>
  );
};

export default StarBackground;
