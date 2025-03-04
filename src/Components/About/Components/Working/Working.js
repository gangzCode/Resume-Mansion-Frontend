import React from 'react'
import './working.css'
import { TbBrandLinkedin } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
function Working() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='working_topic_set'>
                    <p className='working_topic_set_topic'>People you’ll be working with</p>
                    <p className='working_topic_set_pera'>We’re a 100% remote team spread all across the world. Join us!</p>
                </div>
                <div className='working_card_continer_main'>
                    <div className='working_card_continer'>
                        <div className='working_card working_card_one'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Sanka Gunawardhana</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>CEO</p>
                                <p className='worker_card_pera'>Empowering aspiring leaders with impactful resumes</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('https://www.linkedin.com/in/sanka-gunawardhana-0aa4b282/', '_blank')} />
                            </div>
                        </div>
                        <div className='working_card working_card_two'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Olivia</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>Principal Resume Writer</p>
                                <p className='worker_card_pera'>Capturing career stories in winning resumes.</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('https://www.linkedin.com/in/olivia-resume-writer/', '_blank')} />
                            </div>
                        </div>
                        <div className='working_card working_card_three'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Hannah</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>Senior Career Coach</p>
                                <p className='worker_card_pera'>Shaping the career paths of dedicated professionals.</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('https://www.linkedin.com/in/hannah-williams-39227923b/', '_blank')} />
                            </div>
                        </div>
                        <div className='working_card working_card_for'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Vinuri</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>Lead Content Writer</p>
                                <p className='worker_card_pera'>Sharing knowledge to arm job seekers with industry insights.</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('https://www.linkedin.com/in/vinuri-herath-303a6519b/', '_blank')} />
                            </div>
                        </div>
                        <div className='working_card working_card_five'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Elizabeth</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>Senior Resume Writer</p>
                                <p className='worker_card_pera'>Creating comprehensive job search solutions for leaders.</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('', '_blank')} />
                            </div>
                        </div> 
                        <div className='working_card working_card_six'>
                            <div className='working_card_content'>
                                <div className='working_card_worker_name_main'>
                                    <p className='working_card_worker_name'>Thusitha</p>
                                    <MdArrowOutward className='working_card_worker_icon' />
                                </div>
                                <p className='worker_card_possion'>Director</p>
                                <p className='worker_card_pera'>Lifting careers to new heights through innovative solutions.</p>
                                <FaLinkedin className='worker_card_link_icon' onClick={() => window.open('', '_blank')} />
                            </div>
                        </div>
                    </div>
                    <button className='meet_btn' onClick={() => (window.location.href = '/writers')}>Meet your writers</button>
                </div>
            </div>
        </div>
    )
}

export default Working
