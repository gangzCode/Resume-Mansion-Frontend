import React from 'react'
import BlogImg from './img/blog_img.png'
import { MdArrowOutward } from "react-icons/md";
import Avatar from './img/Avatar.png'
function BlogCardLts() {
    return (
        <div>
            <div className='blog_card_lts' onClick={() => (window.location.href = '/blogPostPage')}>
                <img src={BlogImg} alt='blog_image' className='blog_image' />
                <div className='section_one_blog_card'>
                    <p className='section_one_name_section'>Resume Writing</p>
                    <p className='section_one_time_section'>8 min read</p>
                </div>
                <div className='section_one_topic_continer'>
                    <p className='section_one_topic_section'>How to Write a Resume for an Industry You’ve Never Worked In</p>
                    <MdArrowOutward className='section_one_topic_section_arrow'  />
                </div>
                <p className='section_one_peragrap_continer'>Are you overwhelmed by the idea of changing careers and starting over in an entirely new industry? It can certainly feel like a daunting task, especially when you consider every...</p>
                <div className='auther_continer_blog_card'>
                    <img src={Avatar} alt='avatar_image' className='avatar_card_blog' />
                    <div className='auther_data_set'>
                        <p className='avatar_name_blog'>Phoenix Baker</p>
                        <p className='avatar_date'>19 Jan 2022</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCardLts
