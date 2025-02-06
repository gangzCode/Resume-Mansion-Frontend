import React from 'react'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function HeroWriters() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path' onClick={() => (window.location.href = '/about')}>About</p>
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/writers')}>Writers</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Your Personal Branding Experts</h1>
                    <p className='hero_service_pera'>Our extensive team of resume writers consists of industry veterans, blending experience in corporate branding, recruitment, and career coaching to deliver top-quality, impactful resumes and career tools.</p>
                </div>
            </div>
        </div>
    )
}

export default HeroWriters
