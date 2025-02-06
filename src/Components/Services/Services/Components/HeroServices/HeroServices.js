import React from 'react'
import './HeroServices.css'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function HeroServices() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/servicess')}>Services</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Resume Mansion: A One-Stop Solution for all Your Job Search Needs</h1>
                    <p className='hero_service_pera'>Let Resume Mansion change your career trajectory with professionally crafted resumes, cover letters, and LinkedIn profiles that cater to your job search needs. We help job seekers like you build your dream career.</p>
                </div>
            </div>
        </div>
    )
}

export default HeroServices
