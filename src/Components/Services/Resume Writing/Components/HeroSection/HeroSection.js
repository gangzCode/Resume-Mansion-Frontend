import React from "react";
import "./HeroSection.css";
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function HeroSection() {
  return (
    <div className="Resume_Hreeo_home_back">
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
              onClick={() => (window.location.href = "/resumeWriting")}
            >
              Resume Writing
            </p>
          </div>
          <div className="content_hero_service">
            <p className="hero_service_topic_sub">
              Unlock Your Dream Career with Resume Mansion
            </p>
            <h1 className="hero_service_topic">
              Professional Resume Writing Service
            </h1>
            <p className="hero_service_pera">
              Join the winning crowd of over 500,000 successful professionals
              who landed their dream jobs.
            </p>
            <button className="hero_service_btn">
              Order now - Just for $60
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
