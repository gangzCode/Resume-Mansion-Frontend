import React from 'react'
import BlogCard from './BlogCardLts'
function Lastestblogposts() {
    return (
        <div>
            <div>
                <div className='continer_blog_lts'>
                    <p className='continer_blog_lts_topic'>Lastest blog posts</p>
                    <button className='continer_blog_lts_btn' onClick={() => (window.location.href = '/careerAdvice')}>View all posts</button>
                </div>
                <p className='continer_blog_lts_topic_sub'>Tool and strategies modern teams need to help their companies grow.</p>
            </div>
            <div className='blog_card_main_sub_page'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </div>
    )
}

export default Lastestblogposts
