import React from 'react'
import './InvestSection.css'
function InvestSection() {
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div >
          <div className='invest_section_continer'>
            <p className='invest_section_topic'>When you invest in a professionally curated LinkedIn profile…</p>
            <div className='invest_section_card_continer'>
              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  You become more visible
                </p>
                <p className='invest_section_card_data'>A keyword-optimized LinkedIn profile helps you get discovered by more hiring managers and recruiters online.</p>
              </div>

              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  Your entire career is available
                </p>
                <p className='invest_section_card_data'>Potential employers can see the true extent of your long career through your LinkedIn profile, as you don’t have to omit jobs to stick to a two-page resume.</p>
              </div>


              <div className='invest_section_card'>
                <p className='invest_section_card_topic'>
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                  </svg>
                  Your personal brand is evident
                </p>
                <p className='invest_section_card_data'>Hiring managers and recruiters can observe your personal brand at a glance through your professionally enhanced LinkedIn profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestSection
