import React from 'react'

function InvestSection({ InvestSectionTopic, InvestSectionBox1Topic, InvestSectionBox2Topic, InvestSectionBox3Topic, InvestSectionBox1Pera, InvestSectionBox2Pera, InvestSectionBox3Pera }) {
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className='invest_section_continer'>
          <p className='invest_section_topic'>{InvestSectionTopic}</p>
          <div className='invest_section_card_continer'>
            <div className='invest_section_card'>
              <p className='invest_section_card_topic'>
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                </svg>
                {InvestSectionBox1Topic}
              </p>
              <p className='invest_section_card_data'> {InvestSectionBox1Pera} </p>
            </div>

            <div className='invest_section_card'>
              <p className='invest_section_card_topic'>
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                </svg>
                {InvestSectionBox2Topic}
                { }
              </p>
              <p className='invest_section_card_data'> {InvestSectionBox2Pera } </p></div>


            <div className='invest_section_card'>
              <p className='invest_section_card_topic'>
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H6L9 21L12 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM10.88 10.88L9 15L7.12 10.88L3 9L7.12 7.12L9 3L10.88 7.12L15 9L10.88 10.88Z" fill="#051D14" />
                </svg>
                {InvestSectionBox3Topic}
              </p>
              <p className='invest_section_card_data'> {InvestSectionBox3Pera} </p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestSection
