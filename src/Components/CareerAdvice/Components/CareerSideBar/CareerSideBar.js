import React, { useState, useEffect } from 'react';
import './careerSideBar.css';
import { CiSearch } from "react-icons/ci";
import {
    getBlogCategories
  } from "../../../../Services/apiCalls";

function CareerSideBar() {
    const [showAllTags, setShowAllTags] = useState(false);
    const [blogCategories, setBlogCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        const fetchPackages = async () => {
          try {
            const response = await getBlogCategories();
            setBlogCategories(response.data || []);
            setLoading(false);
          } catch (err) {
            setError("Failed to load blog categories");
            setLoading(false);
          }
        };
    
        fetchPackages();
      }, []);


    const tags = [
        "#ResumeMansion", "#ResumeWriting", "#CVWriting", "#CareerAdvice", "#Recruiter",
        "#JobApplication", "#CoverLetterBuilder", "#tag", "#ResumeBuilder", "#WorkFromHome",
        "#WFH", "#ProductiveTime", "#WorkLifeBalance", "#JobHunting", "#JobSearch",
        "#JobDescription", "#ResumeWritingTips", "#ApplicantTrackingSystems", "#ATS", "#ResumeWritingServices",
        "#BestResumeWritingService", "#ResumeDesign", "#ResumeFormatting", "#WorkExperience", "#GoodResumeFormat",
        "#InteractiveResume", "#ResumeSecrets", "#ProfessionalResumeLayout", "#ProfessionalAchievements", "#CoverLetterWriting",
        "#BulletproofResume", "#ReturnToWork", "#NewResume", "#WorkHistory", "#Interview",
        "#Education", "#Certifications", "#RelevantSkills", "#RelevantExperience", "#ModernResumeTemplate",
        "#WriteResumeFromScratch", "#FirstImpressionWithRecruiters", "#ATSFriendlyResume", "#ResumeTemplate", "#ATSResumeTemplate",
        "#JobSearchPlanning", "#StrategicJobSearch", "#JobSearchStrategy", "#ProfessionalReference", "#JobSearchSchedule",
        "#JobSearchCalendar", "#JobHuntTips"
    ];

    const handleToggleTags = () => {
        setShowAllTags(!showAllTags);
    };

    const filteredCategories = blogCategories.filter(category =>
        category.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='fullwith'>
            <div className='career_side_continer'>
                <div className='career_side_section_one'>
                    <div className='career_side_search_bar'>
                        <CiSearch className='career_side_search_icon' />
                        <input
                            type='text'
                            className='career_side_search'
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className='career_side_section_two'>
                    <p className='career_side_section_two_topic'>Blog categories</p>
                    <div className='career_side_section_two_nav_item_set'>
                        <p className='career_side_section_two_nav_item career_side_section_two_nav_item_active'>View all</p>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <p key={category.id} className='career_side_section_two_nav_item'>
                                    {category.category.trim()}
                                </p>
                            ))
                        ) : (
                            <p className='career_side_no_results'>No categories found</p>
                        )}
                    </div>
                </div>
                <div className='career_side_section_three'>
                    <p className='career_side_section_two_topic'>Blog categories</p>
                    <div className='career_side_section_three_tag_continer'>
                        {tags.slice(0, showAllTags ? tags.length : 5).map((tag, index) => (
                            <p key={index} className='career_side_section_three_tagname'>{tag}</p>
                        ))}
                    </div>
                    <p className=' newone' onClick={handleToggleTags}>
                        {showAllTags ? 'See Less' : 'See More'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CareerSideBar;
