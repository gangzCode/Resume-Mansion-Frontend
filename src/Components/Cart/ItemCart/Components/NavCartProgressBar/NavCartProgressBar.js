import React from "react";
import "./NavCartProgressBar.css";

const NavCartProgressBar = () => {
  return (
    <div className="nav_cart_progress">
      <div className="stepper-wrapper">
        <div className="stepper-item completed">
          <div className="step-counter">1</div>
          <div className="step-name">Pick a package</div>
        </div>
        <div className="stepper-item becompleted">
          <div className="step-counter">2</div>
          <div className="step-name">Check out</div>
        </div>
        <div className="stepper-item active">
          <div className="step-counter">3</div>
          <div className="step-name">Submit your details</div>
        </div>
      </div>
    </div>
  );
};

export default NavCartProgressBar;
