import React from 'react'
import './InvestSection.css'
import { useNavigate } from 'react-router-dom';
function InvestSection() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleNavigation = (topic) => {
    navigate(`/industry/${topic}`);
  };
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className='class_continer'>
          <div className='main_colum_ivestse'>
            <p className='invest_section_topic'>When you invest in a professionally written resume...</p>
            <div className='invest_section_card_continer'>
              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  You get seen
                </p>
                <p className='invest_section_card_data'>Did you know that professionally written resumes that are tailored to the profession end up getting you 2-3 times more interviews?</p>
              </div>

              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  You get visible results
                </p>
                <p className='invest_section_card_data'>We give you our word up-front. If you don’t get twice as many interviews within 60 days of applying with your new resume, you get a free resume rewrite from us.</p>
              </div>


              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  You get hired faster
                </p>
                <p className='invest_section_card_data'>Resume Mansion resumes get all the best results! Our clients have reported experiencing 3 times more job offers after working with us!</p>
              </div>
            </div>
          </div>

          <div className='card_invest_sub_section'>
            <div className='card_invest_sub_section_topi_set'>
              <h1 className='card_invest_sub_section_topic'>Personalized resume writing services for your industry</h1>
              <p className='card_invest_sub_section_pera'>The only thing you need to conquer your dream career is a Resume Mansion resume. We have over a decade of experience serving professionals from a variety of industries</p>
            </div>
            <div className='card_invest_sub_section_linkset'>
              <div className='card_invest_sub_section_linkset_colum'>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('accounting')}><u>Accounting & Finance Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('administrative')}><u>Administrative Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('business')}><u>Business & Management Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('education')}><u>Education Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('engineering')}><u>Engineering Resume Writing Services </u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('human')}><u>Human Resources Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('legal')}><u>Legal Resume Writing Services</u></p>
              </div>
              <div className='card_invest_sub_section_linkset_colum'>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('information')}><u>Information Technology Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('marketing')}><u>Marketing Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('medical')}><u>Medical Resume Writing Services</u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('maintenance')}><u>Maintenance & Repair Resume Writing Services </u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('sales')}><u>Sales Resume Writing Services </u></p>
                <p className='card_invest_sub_section_link' onClick={() => handleNavigation('transportation')}><u>Transportation Resume Writing Services</u></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestSection
