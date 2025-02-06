import React from "react";
import { TbFlag3Filled } from "react-icons/tb";
import './imageSection.css'
const ImageSection = () => {
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className="about_grid_image_section_container">
          <div className="about_grid_image_section_container_card1">
            <TbFlag3Filled className="about_grid_image_section_container_card1_icon" />
            <p className="about_grid_image_section_container_card1_topic">We began our story with a clear mission in 2019</p>
            <p className="about_grid_image_section_container_card1_pera">We believe that every job seeker deserves a strong resume that sets the foundation of their job hunt. Our team of career experts are always ready to help aspiring professionals dream bigger.</p>
          </div>
          <div className="about_grid_image_section_container_card2"></div>
          <div className="about_grid_image_section_container_card3"></div>
          <div className="about_grid_image_section_container_card4"></div>
          <div className="about_grid_image_section_container_card5"></div>
          <div className="about_grid_image_section_container_card6">
            <p className="about_grid_image_section_container_card6_topic">Resume Mansion has been a game-changer. </p>
            <p className="about_grid_image_section_container_card6_pera">I had the best experience with my resume, cover letter, and LinkedIn profile with their adept team</p>
            <div className="about_grid_image_section_container_card6_owner_card">
              <p className="about_grid_image_section_container_card6_owner_card_name">• Samuel Evans</p>
              <p className="about_grid_image_section_container_card6_owner_card_pera">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
