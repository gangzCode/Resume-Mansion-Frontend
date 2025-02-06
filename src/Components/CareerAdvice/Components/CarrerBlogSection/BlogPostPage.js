import React from 'react'
import { RiHome6Line } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
import NavBar from '../../../NavBar/NavBar';
import BlogImg from './img/blogMain.png'
import BlogCard1 from './img/blog_card1.png'
import BlogCard2 from './img/blog_card_two.png'
import { LuCopy } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Lastestblogposts from './Lastestblogposts';
import Footer from '../../../Footer/Footer'
function BlogPostPage() {
    return (
        <div className='class_continer'>
            <NavBar />
            <div className='main_blog_page_hero'>
                <div className='continer_main_box'>
                    <div className='container'>
                        <div className='root_path'>
                            <RiHome6Line onClick={() => (window.location.href = '/')} className='path_start' />
                            <MdNavigateNext className='path_next' />
                            <p className='stay_path' onClick={() => (window.location.href = '/careerAdvice')}>Career Advice</p>
                            <MdNavigateNext className='path_next' />
                            <p className='stay_path stay_path_active'>Post Name</p>
                        </div>
                        <div className='blog_previe_page_content'>
                            <div className='blog_previe_page_content_data'>
                                <p className='blog_previe_page_content_date'>October 21, 2024</p>
                                <p className='blog_previe_page_content_topic'>How to write an ATS-friendly resume in 2024</p>
                            </div>
                            <div>
                                <img src={BlogImg} alt='blog_img' className='blog_imagee' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='continer_main_box'>
                <div className='container'>
                    <div className=''>
                    </div>
                    <div className='main_blog_page_content'>
                        <div className='blog_page_content_pera'>
                            <p className='blog_page_content_body_para_main'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.</p>
                        </div>
                        <div className='blog_page_content_body'>
                            <p className='blog_page_content_body_topic'>Introduction</p>
                            <p className='blog_page_content_body_para'>
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
                            </p>
                            <p className='blog_page_content_body_para'>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.  </p>
                            <div className='blog_image_section'>
                                <img src={BlogCard1} alt='blog_card' className='blog_card_image' />
                                <p className='blog_card_image_topic'>Image courtesy of Michael Burrows via Pexels</p>
                            </div>
                            <div className='blog_sub_spectiol_section'>
                                <p className='blog_sub_spectiol_section_pera'>“In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”</p>
                                <p className='blog_sub_spectiol_section_owner_name'>— Olivia Rhye, Product Designer</p>
                            </div>
                            <p className='blog_page_content_body_para'>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</p>
                            <p className='blog_page_content_body_para'>Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.</p>
                            <p className='blog_page_content_body_para'>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci</p>
                            <div>
                                <p className='blog_page_content_body_new_topic'>Software and tools</p>
                                <p className='blog_page_content_body_para'>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p>
                                <p className='blog_page_content_body_para'>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat. </p>
                            </div>
                            <div>
                                <p className='blog_page_content_body_new_topic'>Other resources</p>
                                <p className='blog_page_content_body_para'>Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.</p>
                                <div className='blog_order_list_continer'>
                                    <ol >
                                        <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                                        <li>
                                            Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
                                        <li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
                                    </ol>
                                </div>
                            </div>
                            <div className='blog_image_section'>
                                <img src={BlogCard2} alt='blog_card' className='blog_card_image' />
                                <p className='blog_card_image_topic'>Image courtesy of Michael Burrows via Pexels</p>
                            </div>
                            <p className='blog_page_content_body_para'>Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.</p>
                            <p className='blog_page_content_body_para'>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.</p>

                            <div className='conclulation_section'>
                                <p className='blog_page_content_body_topic'>Conclusion</p>
                                <p className='blog_page_content_body_para'>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse</p>
                                <p className='blog_page_content_body_para'>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p>
                                <p className='blog_page_content_body_para'>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.</p>
                            </div>
                            <div className='blog_tag_section'>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                                <p className='tag_blog_page'>#tag</p>
                            </div>
                            <div className='action_section_blog_btn_nav'>
                                <p className='action_name'>Share this post</p>
                                <div className='action_btn_set'>
                                    <button className='btn_action'><LuCopy /> Copy link</button>
                                    <button className='btn_action'><FaTwitter /></button>
                                    <button className='btn_action'><FaFacebook /></button>
                                    <button className='btn_action'><FaLinkedin /></button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card_main'>
                        <div>
                            <Lastestblogposts />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BlogPostPage
