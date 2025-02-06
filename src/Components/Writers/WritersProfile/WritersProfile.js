import React from 'react'
import './WritersProfile.css'
import Card1 from './img/card1.png'
import Card2 from './img/card2.png'
import Card3 from './img/card3.png'
import { FaLinkedin } from "react-icons/fa6";
function WritersProfile() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='writer_card_continer'>
                    <div className='writer_card writer_card_one'>
                        <div className='writr_card_ne_pd'>
                            <p className='writer_card_topic'>Amelia Walker</p>
                            <p className='writer_card_pera'>Combining her experience in human resources, international business, and career coaching, Amelia delivers total job search solutions to aspiring leaders.</p>
                            <FaLinkedin className='writer_card_icon' />
                        </div>
                        <img src={Card1} alt='cardimage' className='writer_card_image' />
                    </div>

                    <div className='writer_card writer_card_two'>
                        <div className='writr_card_ne_pd'>
                            <p className='writer_card_topic'>Claire Madison</p>
                            <p className='writer_card_pera'>Claire has a strong history in content creation and recruitment, a combination that makes her a powerful asset to our professional resume writing team.</p>
                            <FaLinkedin className='writer_card_icon' />
                        </div>
                        <img src={Card2} alt='cardimage' className='writer_card_image' />
                    </div>

                    <div className='writer_card writer_card_thre'>
                        <div className='writr_card_ne_pd'>
                            <p className='writer_card_topic'>Charlotte Brown</p>
                            <p className='writer_card_pera'>Charlotte’s background in human resource management helps her create compelling resumes and cover letters that reflect qualities that recruiters look for in job applications.</p>
                            <FaLinkedin className='writer_card_icon' />
                        </div>
                        <img src={Card3} alt='cardimage' className='writer_card_image' />
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default WritersProfile
