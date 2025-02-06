import React from 'react'
import './hero.css'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function HeroSection() {

    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/about')}>About</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Our company </h1>
                    <p className='hero_service_pera'>Resume Mansion is a project of passion of a team of highly talented recruitment professionals. We help job seekers from the entry-level to the C-suite by crafting professional resumes, cover letters, and LinkedIn profiles that open new doors.</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
