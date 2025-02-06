import React from "react";
import "./NavCartProgressBar.css";

const NavCartProgressBar = () => {
    return (
        <div className="nav_cart_progress">
            <div class="stepper-wrapper">
                <div class="stepper-item completed">
                    <div class="step-counter">1</div>
                    <div class="step-name">Pick a package</div>
                </div>
                <div class="stepper-item becompleted">
                    <div class="step-counter">2</div>
                    <div class="step-name">Check out</div>
                </div>
                <div class="stepper-item active">
                    <div class="step-counter">3</div>
                    <div class="step-name">Submit your details</div>
                </div>
            </div>
        </div>
    );
};

export default NavCartProgressBar;
