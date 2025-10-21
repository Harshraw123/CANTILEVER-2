import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroButton.css";

const HeroButton = ({ text = "Learn More" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="button1">
      <button className="heroButton" onClick={handleClick}>
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">{text}</span>
      </button>
    </div>
  );
};

export default HeroButton;
