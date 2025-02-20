import React, { useState } from 'react';
import './Cookies.css'
function Cookies({ onClose }) {
    return (
        <div>
            <div className='cookis_continer'>
                <div className='cookis_box'>
                    <div className='cookis_box_one'>
                        <p className='cookis_topic'>Choose your cookies</p>
                        <p className='cookis_pera'>Cookies help us to enhance your experience, tailar ads to your interests and improve our website. <span className='lernmore_cookis'>Learn more and manage</span></p>
                    </div>
                    <div className='cookis_box_two'>
                    <button onClick={onClose} className='cookis_box_two_btn_one'>
                        Accept all
                    </button>
                    <button onClick={onClose} className='cookis_box_two_btn_two'>
                        Reject non-essential cookies
                    </button>
                </div>
                </div>
               
            </div>
        </div>
    )
}

export default Cookies
