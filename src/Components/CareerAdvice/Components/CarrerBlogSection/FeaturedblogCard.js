import React from 'react'
import Avatar from './img/oli.webp'
function FeaturedblogCard() {
    return (
        <div className='main_feature_carrd'>
            <div className='main_feature_carrd_colum'>
                <div className='main_feature_carrd_colum_image'>

                </div>
            </div>
            <div className='main_feature_carrd_colum'>
                <div className='main_feature_carrd_colum_contend'>
                    <div className='flex_one_blog'>
                        <div className='toic_eit'>
                            <div className='section_one_blog_card'>
                                <p className='section_one_name_section'>ATS</p>
                                <p className='section_one_time_section'>8 min read</p>
                            </div>
                        </div>
                        <div className='pera_topic_blog'>
                            <p className='section_one_topic_section'>How to write an ATS-friendly resume in 2024</p>
                            <p className='section_one_peragrap_continer'>How do you create compelling presentations that wow your colleagues and impress your managers?</p>
                        </div>
                    </div>
                    <div className='auther_continer_blog_card'>
                        <img src={Avatar} alt='avatar_image' className='avatar_card_blog' />
                        <div className='auther_data_set'>
                            <p className='avatar_name_blog'>Olivia Rhye</p>
                            <p className='avatar_date'>20 Jan 2022</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedblogCard
