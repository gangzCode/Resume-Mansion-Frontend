import React from 'react'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
function CareerHero() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='root_path'>
                    <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                    <MdNavigateNext className='path_next' />
                    <p className='stay_path stay_path_active' onClick={() => (window.location.href = '/careerAdvice')}>Career Advice</p>
                </div>
                <div className='content_hero_service'>
                    <h1 className='hero_service_topic'>Your Career Compass: Expert Tips & Insights</h1>
                    <p className='hero_service_pera'>Want to take your career to new heights? Explore our career advice blogs for everything under the sun related to career guidance. We have 1000+ articles sharing wisdom on resume writing, interview prep, career advancement, job searching, career planning, personal development, and everything else you need for your career growth.</p>
                </div>
            </div>
        </div>
    )
}

export default CareerHero
