import React from 'react'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function HeroSection() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/privacyPolicy')}>Privacy Policy</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Privacy Policy</h1>
                    <p className='hero_service_pera'>Last Updated: 10th January 2025</p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
