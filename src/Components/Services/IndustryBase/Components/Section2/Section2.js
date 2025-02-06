import React from 'react'
function Section2({ Section2Topic, Section2pera1, Section2pera2 }) {
  return (
    <div className='continer_main_box'>
      <div className='container'>
        <div className='resume_elevate_continer'>
          <div className='resume_elevate_main_container'>
            <div className='resume_elevate_continer_colum resume_elevate_continer_colum_setup'>
              <h1 className='resume_elevate_continer_colum_topic'>{Section2Topic}</h1>
              <p className='resume_elevate_continer_colum_pera'>{Section2pera1}</p>
              <p className='resume_elevate_continer_colum_pera'>{Section2pera2}</p>
            </div>
            <div className='resume_elevate_continer_colum'>
            <div className='card_one_resume_section_image_why'>
            </div>
          </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Section2
