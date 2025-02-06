import React from 'react'
import './Pricing.css'
import Pop from './img/pop.png'
function Pricing() {
    return (
        <div>
            <div className='price_container_service_page_main'>
                <div className='continer_main_box'>
                    <div className='container'>
                        <div className='home_continer_main_one'>
                            <div className='price_card_conetnt_hero'>
                                <p className='price_card_conetnt_hero_topic'>Choose your package - Take your career to next level</p>
                                <p className='price_card_conetnt_hero_pera'> Ready to invest in your future? Choose a package that suits your career goals and get started on crafting a standout resume. Each package is designed to provide you with the best value for your investment.</p>
                            </div>
                            <div className='price_card_container'>
                                <div className='price_card'>
                                    <div className='pric_card_content_topic'>
                                        <p className='price_card_topic'>Career Starter</p>
                                        <p className='price_card_pera'>Kick off the job search with a keyword-optimized, ATS-friendly resume.</p>
                                    </div>
                                    <div className='pric_card_content'>
                                        <p className='price_card_name'>Investment</p>
                                        <p className='price_card_price'>$169</p>
                                    </div>
                                    <button className='price_card_btn' onClick={() => (window.location.href = '/itemCart')}>Choose</button>
                                    <div className='price_card_item_continer'>
                                        <p className='price_card_sub'>What You’ll Get</p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>

                                            Keyword-optimized professional resume
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            ATS-friendly, modern resume format
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Professional resume review and critique
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Editable and PDF versions of your resume
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            48-hour turnaround time (24-hour Express Delivery optional)
                                        </p>
                                    </div>
                                </div>
                                <div className='price_card'>
                                    <div className='pric_card_content_topic'>
                                        <p className='price_card_topic'>Professional Edge</p>
                                        <p className='price_card_pera'>Improve your visibility and impact with a winning resume and compelling cover letter.</p>
                                    </div>
                                    <div className='pric_card_content'>
                                        <div className='price_set_card'>
                                            <p className='price_card_name'>Investment</p>
                                            <p className='price_off'>50% OFF</p>
                                        </div>

                                        <div className='price_drop'>
                                            <p className='price_card_price'>$229</p>
                                            <p className='dropp_price'>$300</p>
                                        </div>
                                    </div>
                                    <button className='price_card_btn' onClick={() => (window.location.href = '/itemCart')}>Choose</button>
                                    <div className='price_card_item_continer'>
                                        <p className='price_card_sub'>What You’ll Get</p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Personalized cover letter writing service
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Keyword-optimized resume & cover letter
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>

                                            ATS-friendly, modern resume & cover letter formats
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Editable and PDF versions of your documents
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            48-hour turnaround time (24-hour Express Delivery optional)
                                        </p>
                                    </div>
                                </div>
                                <div className='price_card'>
                                    <div className='pric_card_content_topic'>
                                        <div className='topoc'>
                                            <p className='price_card_topic'>Executive Boost</p>
                                            <div className='pop_image'>
                                                <div className='most_batch'>
                                                    <p className='most_batch_topic'>Most Popular</p>
                                                </div>

                                            </div>

                                            <div className='most_svg'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                                    <path d="M10.5 13.5L0 0L17.5 1.5L10.5 13.5Z" fill="#AA1111" />
                                                </svg>
                                            </div>
                                        </div>

                                        <p className='price_card_pera_new'>Put together a memorable job application with a professional resume, cover letter, and LinkedIn profile.</p>
                                    </div>

                                    <div className='pric_card_content'>
                                        <p className='price_card_name'>Investment</p>
                                        <p className='price_card_price'>$369</p>
                                    </div>

                                    <button className='price_card_btn' onClick={() => (window.location.href = '/itemCart')}>Choose</button>
                                    <div className='price_card_item_continer'>
                                        <p className='price_card_sub'>What You’ll Get</p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Specialized LinkedIn profile optimization service
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Specialized LinkedIn profile optimization service
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            ATS-friendly, modern resume & cover letter formats
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            Editable and PDF versions of your documents
                                        </p>
                                        <p className='price_card_item'>
                                            <div>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12" cy="12" r="10" fill="#051D14" />
                                                    <path d="M12.0001 2.00009C6.48608 2.00009 2.00008 6.48609 2.00008 12.0001C2.00008 17.5141 6.48608 22.0001 12.0001 22.0001C17.5141 22.0001 22.0001 17.5141 22.0001 12.0001C22.0001 6.48609 17.5141 2.00009 12.0001 2.00009ZM10.0011 16.4131L6.28808 12.7081L7.70008 11.2921L9.99908 13.5871L15.2931 8.29309L16.7071 9.70709L10.0011 16.4131Z" fill="#BCEC88" />
                                                </svg>
                                            </div>
                                            48-hour turnaround time (24-hour Express Delivery optional)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='sub_card_price'>
                                <div >
                                    <p className='topic_sub_price'>Custom Career Suite</p>
                                    <p className='pera_sub_price'>Build your own job search suite with multiple resumes, cover letters, and LinkedIn profiles.</p></div>
                                <div className='lft_clm'>
                                    <div className='sub_card_price_main'>
                                        <p className='fm_price'>From</p>
                                        <p className='sub_card_price_100'>$100</p>
                                    </div>
                                    <button className='sub_card_btn_price'>Choose</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing
