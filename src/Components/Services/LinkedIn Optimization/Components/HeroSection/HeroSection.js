import React from "react";
import "./HeroSection.css";
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  addToCartService,
  clearCart,
  getCartItems,
  getCurrentOrder,
} from "../../../../../Services/apiCalls";
import { useAuth } from "../../../../../Context/AuthContext";
import { useSnackbar } from "../../../../../Context/SnackbarContext";

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSnackbar } = useSnackbar();

  const handleOrderNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const orderResponse = await getCurrentOrder();

      if (
        orderResponse.http_status === 200 &&
        orderResponse.data.length !== 0
      ) {
        console.log(orderResponse, "orderResponse");
        showSnackbar("You have an active order in progress", "warning");
        return;
      }

      localStorage.removeItem("selectedPackage");

      const cartData = {
        package_id: 4,
      };

      const response = await addToCartService(cartData);

      if (response.status !== 200) {
        localStorage.setItem("orderId", response.data.order.id);
      }

      const packageDetails = {
        id: 4,
        title: "Build Your Own Package",
        price: 60,
        shortDescription:
          "Build your own job search suite with multiple resumes, cover letters, and LinkedIn profiles.",
      };

      localStorage.setItem("selectedPackage", JSON.stringify(packageDetails));
      navigate("/itemCart");
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className=" Resume_Hreeo_home_back">
      <div className="continer_main_box">
        <div className="container">
          <div className="root_path">
            <RiHome6Line
              onClick={() => (window.location.href = "/")}
              className="path_start"
            />
            <MdNavigateNext className="path_next" />
            <p
              className="stay_path"
              onClick={() => (window.location.href = "/servicess")}
            >
              Services
            </p>
            <MdNavigateNext className="path_next" />
            <p
              className="stay_path stay_path_active"
              onClick={() => (window.location.href = "/linkedInOptimization")}
            >
              LinkedIn Optimization{" "}
            </p>
          </div>
          <div className="content_hero_service">
            <p className="hero_service_topic_sub">
              Let your LinkedIn profile shine bright
            </p>
            <h1 className="hero_service_topic">
              LinkedIn Profile Optimization Service
            </h1>
            <p className="hero_service_pera">
              Boost your online presence with a keyword-optimized LinkedIn
              profile from Resume Mansion. Our experts showcase your strengths
              to help you stand out to recruiters and elevate your personal
              brand.
            </p>
            <button className="hero_service_btn" onClick={handleOrderNow}>
              Order now - Just for $60
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
