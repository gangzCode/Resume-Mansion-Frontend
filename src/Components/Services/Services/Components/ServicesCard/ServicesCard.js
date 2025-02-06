import React from 'react'
import './ServicesCard.css'
import { MdDone } from "react-icons/md";
import Card1 from './img/card1.png'
import Card2 from './img/card2.png'
import Card3 from './img/card3.png'
function ServicesCard() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='card_set_continer_service_page'>
                    <div className='service_page_card card_service_page_one'>
                        <div className='service_page_card_colum'>
                            <h2 className='service_page_card_topic'>Professional Resume Writing Services</h2>
                            <p className='service_page_card_pera'>Get the best of our certified professional resume writing services by collaborating with our resume writing team. We help you propel your job search forward by creating personalized resumes that are:</p>
                            <div className='service_page_card_content_set'>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Formatted for easy reading and visual appeal
                                </p>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Tailored for your target job description and job search needs
                                </p>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Keyword optimized to get past the Applicant Tracking Systems (ATSs)
                                </p>
                            </div>
                            <button className='service_page_card_btn' onClick={() => (window.location.href = '/resumeWriting')}>Learn more</button>
                        </div>
                        <div className='service_page_card_colum' >
                            <img src={Card1} alt="card_image" className='service_page_card_image' />
                        </div>
                    </div>

                    <div className='service_page_card card_service_page_two'>
                        <div className='service_page_card_colum'>
                            <h2 className='service_page_card_topic'>Professional Cover Letter Writing Services</h2>
                            <p className='service_page_card_pera'>Your job application is incomplete without a keyword-optimized cover letter. Let our professional resume writers craft a matching cover letter to go with your brand new resume. Resume Mansion’s cover letters are:</p>
                            <div className='service_page_card_content_set'>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Keyword optimized to get you seen by the right employer
                                </p>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Tailored for your target job title and personalized to your needs
                                </p>
                                <p className='service_page_card_content'>
                                    <div className='tik'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 9.15527e-05C4.486 9.15527e-05 0 4.48609 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48609 15.514 9.15527e-05 10 9.15527e-05ZM8.001 14.4131L4.288 10.7081L5.7 9.29209L7.999 11.5871L13.293 6.29309L14.707 7.70709L8.001 14.4131Z" fill="#532E07" />
                                        </svg>
                                    </div>
                                    Built to showcase your experience as well as your enthusiasm
                                </p>
                            </div>
                            <button className='service_page_card_btn' onClick={() => (window.location.href = '/coverLetter')}>Learn more</button>
                        </div>
                        <div className='service_page_card_colum' >
                            <img src={Card2} alt="card_image" className='service_page_card_image' />
                        </div>
                    </div>


                    <div className='service_page_card card_service_page_three'>
                        <div className='service_page_card_colum'>
                            <h2 className='service_page_card_topic'>LinkedIn Profile Optimization</h2>
                            <p className='service_page_card_pera'>You need a stellar LinkedIn profile when job hunting in this digital age. Resume Mansion’s industry experts work collaboratively with you to bring out the best of your career through your LinkedIn profile. We optimize LinkedIn profiles to:</p>
                            <div className='service_page_card_content_set'>
                                <p className='service_page_card_content'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 0.00012207C4.486 0.00012207 0 4.48612 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48612 15.514 0.00012207 10 0.00012207ZM8.001 14.4131L4.288 10.7081L5.7 9.29212L7.999 11.5871L13.293 6.29312L14.707 7.70712L8.001 14.4131Z" fill="#063B26" />
                                        </svg>
                                    </div>
                                    Display carefully crafted content that aligns with your career aspirations
                                </p>
                                <p className='service_page_card_content'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 0.00012207C4.486 0.00012207 0 4.48612 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48612 15.514 0.00012207 10 0.00012207ZM8.001 14.4131L4.288 10.7081L5.7 9.29212L7.999 11.5871L13.293 6.29312L14.707 7.70712L8.001 14.4131Z" fill="#063B26" />
                                        </svg>
                                    </div>
                                    Attract potential employers and recruiters through compelling descriptions
                                </p>
                                <p className='service_page_card_content'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 0.00012207C4.486 0.00012207 0 4.48612 0 10.0001C0 15.5141 4.486 20.0001 10 20.0001C15.514 20.0001 20 15.5141 20 10.0001C20 4.48612 15.514 0.00012207 10 0.00012207ZM8.001 14.4131L4.288 10.7081L5.7 9.29212L7.999 11.5871L13.293 6.29312L14.707 7.70712L8.001 14.4131Z" fill="#063B26" />
                                        </svg>
                                    </div>
                                    Improve your visibility to recruiters and employers through keyword optimization
                                </p>
                            </div>
                            <button className='service_page_card_btn_thre' onClick={() => (window.location.href = '/linkedInOptimization')}>Learn more</button>
                        </div>
                        <div className='service_page_card_colum' >
                            <img src={Card3} alt="card_image" className='service_page_card_image' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesCard
