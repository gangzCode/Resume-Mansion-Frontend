import React from 'react'
import './blog.css'
import CarrerSideBar from '../CareerSideBar/CareerSideBar'
import BlogCard from './BlogCard'
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import FeaturedblogCard from './FeaturedblogCard';
function CarrerBlogSection() {
    return (
        <div className='continer_main_box'>
            <div className='container'>
                <div className='carrer_Blog_Section_continer'>
                    <div className='fullwith'>
                        <CarrerSideBar />
                    </div>
                    <div className='bolog_with_full'>
                        <FeaturedblogCard />
                        <div className='blog_card_continer'>
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                            <BlogCard />
                        </div>
                    </div>
                </div>
                <div className='nav_normaltype'>
                    <div className='navigate_btn_footer_continer'>
                        <button className='navigate_btn_footer'><GrLinkPrevious /> Previous</button>
                        <div className='navigate_btn_footer_sub_continer'>
                            <button className='navigate_btn_footer_number navigate_btn_footer_number_active'>1</button>
                            <button className='navigate_btn_footer_number'>2</button>
                            <button className='navigate_btn_footer_number'>3</button>
                            <p className='navigate_btn_footer_number'>...</p>
                            <button className='navigate_btn_footer_number'>8</button>
                            <button className='navigate_btn_footer_number'>9</button>
                            <button className='navigate_btn_footer_number'>10</button>
                        </div>
                        <button className='navigate_btn_footer'>Next <GrLinkNext /></button>
                    </div>
                </div>
                <div className='nav_resltype'>
                    <div className='res_actionset'>
                        <div> <button className='navigate_btn_footer'><GrLinkPrevious /></button></div>
                        <div><p>Page 1 of 10</p></div>
                        <div><button className='navigate_btn_footer'><GrLinkNext /></button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarrerBlogSection
