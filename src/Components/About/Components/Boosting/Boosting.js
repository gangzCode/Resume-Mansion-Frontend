import React from 'react'
import Card1 from './img/card1.png'
import Card2 from './img/card2.png'
import Card3 from './img/card3.png'
import './Boosting.css'
function Boosting() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='boosting_card_continer_main_topic_set'>
                    <p className='boosting_card_continer_main_topic'>Having trouble standing out? Try our Career Boosting Services</p>
                    <p className='boosting_card_continer_main_pera'>Our tailored services—resume writing, cover letter creation, LinkedIn optimization, and career advice—are designed to showcase your strengths and help you make a lasting impression in today’s job market.</p>
                </div>
                <div className='boosting_card_continer_main'>
                    <div className='boosting_card_continer'>
                        <div className='boosting_card card_one_boost'>
                            <p className='boosting_card_topic'>Professional Resume Writing Services</p>
                            <p className='boosting_card_pera boosting_card_pera_one'>Put your best foot forward in the job search with a personalized resume from Resume Mansion. Our professional resume writing services are renowned for keyword-optimized, tailored content and ATS-friendly designs. </p>
                            <img src={Card1} alt='card_boot' className='boosting_card_image' />
                        </div>
                        <div className='boosting_card card_two_boost'>
                            <p className='boosting_card_topic'>Professional Cover Letter Writing Services</p>
                            <p className='boosting_card_pera boosting_card_pera_two'>Take your job application a step further with a matching cover letter to go with your resume. Resume Mansion’s cover letter writing services are tailored to create winning documents that are customized to your job search needs.</p>
                            <img src={Card2} alt='card_boot' className='boosting_card_image' />
                        </div>
                    </div>
                    <div className='boosting_card_thre card_thre_boost'>
                        <p className='boosting_card_topic'>Professional Cover Letter Writing Services</p>
                        <p className='boosting_card_pera boosting_card_pera_thre'>Display the best bits of your career online with Resume Mansion’s LinkedIn optimization services. Let our career experts build a keyword-rich LinkedIn profile for you. Our LinkedIn profile optimization services are guaranteed to improve your visibility to recruiters.</p>
                        <img src={Card3} alt='card_boot' className='boosting_card_image' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Boosting
